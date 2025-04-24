-- Enable RLS on all tables
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_reports ENABLE ROW LEVEL SECURITY;

-- Create roles
CREATE TYPE user_role AS ENUM ('patient', 'doctor', 'admin');
ALTER TABLE auth.users ADD COLUMN role user_role DEFAULT 'patient';

-- Patient policies
CREATE POLICY "Patients can view only their own records"
ON patients FOR SELECT
TO authenticated
USING (
  (auth.uid() = user_id AND (SELECT role FROM auth.users WHERE id = auth.uid()) = 'patient')
  OR
  ((SELECT role FROM auth.users WHERE id = auth.uid()) IN ('doctor', 'admin'))
);

-- Doctor policies
CREATE POLICY "Doctors can view assigned patients"
ON patients FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM doctor_patient_relationships dpr
    WHERE dpr.patient_id = patients.id
    AND dpr.doctor_id = auth.uid()
    AND (SELECT role FROM auth.users WHERE id = auth.uid()) = 'doctor'
  )
  OR
  (SELECT role FROM auth.users WHERE id = auth.uid()) = 'admin'
);

-- Observation policies
CREATE POLICY "Access control for observations"
ON observations FOR ALL
TO authenticated
USING (
  (patient_id IN (
    SELECT id FROM patients WHERE user_id = auth.uid()
  ) AND (SELECT role FROM auth.users WHERE id = auth.uid()) = 'patient')
  OR
  (patient_id IN (
    SELECT p.id FROM patients p
    INNER JOIN doctor_patient_relationships dpr ON p.id = dpr.patient_id
    WHERE dpr.doctor_id = auth.uid()
  ) AND (SELECT role FROM auth.users WHERE id = auth.uid()) = 'doctor')
  OR
  (SELECT role FROM auth.users WHERE id = auth.uid()) = 'admin'
);

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