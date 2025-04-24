-- Add comprehensive RLS policies for all tables created in previous migrations

-- Patient and doctor role types (ensure this exists)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('patient', 'doctor', 'admin');
    END IF;
END $$;

-- Ensure auth.users has role column
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'auth' 
        AND table_name = 'users' 
        AND column_name = 'role'
    ) THEN
        ALTER TABLE auth.users ADD COLUMN role user_role DEFAULT 'patient';
    END IF;
END $$;

-- Create helper function for checking doctor-patient relationship
CREATE OR REPLACE FUNCTION check_doctor_patient_relationship(doctor_id uuid, patient_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM doctor_patient_relationships
    WHERE doctor_id = $1 AND patient_id = $2
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create helper function for getting the user's role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
BEGIN
  RETURN (SELECT role FROM auth.users WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Patients table policies
CREATE POLICY "Patients can view only their own records"
ON patients FOR SELECT
TO authenticated
USING (
  (auth.uid() = user_id AND get_user_role() = 'patient')
  OR
  (get_user_role() IN ('doctor', 'admin'))
);

CREATE POLICY "Patients can update only their own records"
ON patients FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND get_user_role() = 'patient')
WITH CHECK (auth.uid() = user_id AND get_user_role() = 'patient');

-- Doctors table policies
CREATE POLICY "Doctors can view their own records"
ON doctors FOR SELECT
TO authenticated
USING (
  (auth.uid() = user_id AND get_user_role() = 'doctor')
  OR
  (get_user_role() = 'admin')
);

CREATE POLICY "Doctors can update only their own records"
ON doctors FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND get_user_role() = 'doctor')
WITH CHECK (auth.uid() = user_id AND get_user_role() = 'doctor');

-- Appointments table policies
CREATE POLICY "Users can view their own appointments"
ON appointments FOR SELECT
TO authenticated
USING (
  -- Patients can see their appointments
  (EXISTS (
    SELECT 1 FROM patients p
    WHERE p.user_id = auth.uid()
    AND p.id = appointments.patient_id
    AND get_user_role() = 'patient'
  ))
  OR
  -- Doctors can see appointments they're scheduled for
  (EXISTS (
    SELECT 1 FROM doctors d
    WHERE d.user_id = auth.uid()
    AND d.id = appointments.doctor_id
    AND get_user_role() = 'doctor'
  ))
  OR
  -- Admins can see all appointments
  (get_user_role() = 'admin')
);

-- Messages table policies
CREATE POLICY "Users can view messages they sent or received"
ON messages FOR SELECT
TO authenticated
USING (
  auth.uid() = sender_id OR auth.uid() = recipient_id
);

CREATE POLICY "Users can insert messages they send"
ON messages FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = sender_id
);

-- Health records policies
CREATE POLICY "Users can view authorized health records"
ON health_records FOR SELECT
TO authenticated
USING (
  -- Patients can see their own health records
  (EXISTS (
    SELECT 1 FROM patients p
    WHERE p.user_id = auth.uid()
    AND p.id = health_records.patient_id
    AND get_user_role() = 'patient'
  ))
  OR
  -- Doctors can see health records of their patients
  (EXISTS (
    SELECT 1 FROM doctor_patient_relationships dpr
    WHERE dpr.doctor_id = (SELECT id FROM doctors WHERE user_id = auth.uid())
    AND dpr.patient_id = health_records.patient_id
    AND get_user_role() = 'doctor'
  ))
  OR
  -- Admins can see all health records
  (get_user_role() = 'admin')
);

-- Lab results policies
CREATE POLICY "Users can view authorized lab results"
ON lab_results FOR SELECT
TO authenticated
USING (
  -- Link through health_records to determine access
  EXISTS (
    SELECT 1 FROM health_records hr
    WHERE hr.id = lab_results.health_record_id
    AND (
      -- Patients can see their own lab results
      (EXISTS (
        SELECT 1 FROM patients p
        WHERE p.user_id = auth.uid()
        AND p.id = hr.patient_id
        AND get_user_role() = 'patient'
      ))
      OR
      -- Doctors can see lab results of their patients
      (EXISTS (
        SELECT 1 FROM doctor_patient_relationships dpr
        WHERE dpr.doctor_id = (SELECT id FROM doctors WHERE user_id = auth.uid())
        AND dpr.patient_id = hr.patient_id
        AND get_user_role() = 'doctor'
      ))
      OR
      -- Admins can see all lab results
      (get_user_role() = 'admin')
    )
  )
);

-- Prescriptions policies
CREATE POLICY "Users can view authorized prescriptions"
ON prescriptions FOR SELECT
TO authenticated
USING (
  -- Patients can see their own prescriptions
  (EXISTS (
    SELECT 1 FROM patients p
    WHERE p.user_id = auth.uid()
    AND p.id = prescriptions.patient_id
    AND get_user_role() = 'patient'
  ))
  OR
  -- Doctors can see prescriptions they created
  (EXISTS (
    SELECT 1 FROM doctors d
    WHERE d.user_id = auth.uid()
    AND d.id = prescriptions.doctor_id
    AND get_user_role() = 'doctor'
  ))
  OR
  -- Admins can see all prescriptions
  (get_user_role() = 'admin')
);

-- Audit logs policies - only admins can see all logs
CREATE POLICY "Admins can view audit logs"
ON audit_logs FOR SELECT
TO authenticated
USING (
  get_user_role() = 'admin'
);

-- Patient vitals policies
CREATE POLICY "Users can view authorized patient vitals"
ON patient_vitals FOR SELECT
TO authenticated
USING (
  -- Patients can see their own vitals
  (EXISTS (
    SELECT 1 FROM patients p
    WHERE p.user_id = auth.uid()
    AND p.id = patient_vitals.patient_id
    AND get_user_role() = 'patient'
  ))
  OR
  -- Doctors can see vitals of their patients
  (EXISTS (
    SELECT 1 FROM doctor_patient_relationships dpr
    WHERE dpr.doctor_id = (SELECT id FROM doctors WHERE user_id = auth.uid())
    AND dpr.patient_id = patient_vitals.patient_id
    AND get_user_role() = 'doctor'
  ))
  OR
  -- Admins can see all vitals
  (get_user_role() = 'admin')
); 