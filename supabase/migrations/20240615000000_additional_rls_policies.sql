-- Additional RLS policies for health records and other tables

-- Health records insertion policies (missing in original)
CREATE POLICY "Doctors can create health records for their patients"
ON public.health_records FOR INSERT
TO authenticated
WITH CHECK (
  -- Doctors can create health records for patients they have appointments with
  (get_user_role() = 'doctor' AND
   patient_id IN (
    SELECT p.id FROM public.patients p
    JOIN public.appointments a ON p.id = a.patient_id
    WHERE a.doctor_id IN (
      SELECT id FROM public.doctors 
      WHERE user_id = auth.uid()
    )
  ))
  OR
  -- Admins can create any health record
  (get_user_role() = 'admin')
);

-- Health records update policies
CREATE POLICY "Doctors can update health records they created"
ON public.health_records FOR UPDATE
TO authenticated
USING (
  -- Doctors can update health records they created
  (created_by = auth.uid() AND get_user_role() = 'doctor')
  OR
  -- Admins can update any health record
  (get_user_role() = 'admin')
)
WITH CHECK (
  -- Doctors can update health records they created
  (created_by = auth.uid() AND get_user_role() = 'doctor')
  OR
  -- Admins can update any health record
  (get_user_role() = 'admin')
);

-- Prescriptions insertion policies
CREATE POLICY "Doctors can create prescriptions for their patients"
ON public.prescriptions FOR INSERT
TO authenticated
WITH CHECK (
  -- Doctors can create prescriptions for patients they have appointments with
  (get_user_role() = 'doctor' AND
   patient_id IN (
    SELECT p.id FROM public.patients p
    JOIN public.appointments a ON p.id = a.patient_id
    WHERE a.doctor_id IN (
      SELECT id FROM public.doctors 
      WHERE user_id = auth.uid()
    )
  ))
  OR
  -- Admins can create any prescription
  (get_user_role() = 'admin')
);

-- Prescriptions update policies
CREATE POLICY "Doctors can update prescriptions they created"
ON public.prescriptions FOR UPDATE
TO authenticated
USING (
  -- Doctors can update prescriptions they created
  (doctor_id IN (
    SELECT id FROM public.doctors 
    WHERE user_id = auth.uid()
  ) AND get_user_role() = 'doctor')
  OR
  -- Admins can update any prescription
  (get_user_role() = 'admin')
)
WITH CHECK (
  -- Doctors can update prescriptions they created
  (doctor_id IN (
    SELECT id FROM public.doctors 
    WHERE user_id = auth.uid()
  ) AND get_user_role() = 'doctor')
  OR
  -- Admins can update any prescription
  (get_user_role() = 'admin')
);

-- Appointments insertion policies
CREATE POLICY "Users can create appointments"
ON public.appointments FOR INSERT
TO authenticated
WITH CHECK (
  -- Patients can create appointments for themselves
  (patient_id IN (
    SELECT id FROM public.patients 
    WHERE user_id = auth.uid()
  ) AND get_user_role() = 'patient')
  OR
  -- Doctors can create appointments they're scheduled for
  (doctor_id IN (
    SELECT id FROM public.doctors 
    WHERE user_id = auth.uid()
  ) AND get_user_role() = 'doctor')
  OR
  -- Admins can create any appointment
  (get_user_role() = 'admin')
);

-- Appointments update policies
CREATE POLICY "Users can update appointments"
ON public.appointments FOR UPDATE
TO authenticated
USING (
  -- Patients can update their appointments
  (patient_id IN (
    SELECT id FROM public.patients 
    WHERE user_id = auth.uid()
  ) AND get_user_role() = 'patient')
  OR
  -- Doctors can update appointments they're scheduled for
  (doctor_id IN (
    SELECT id FROM public.doctors 
    WHERE user_id = auth.uid()
  ) AND get_user_role() = 'doctor')
  OR
  -- Admins can update any appointment
  (get_user_role() = 'admin')
)
WITH CHECK (
  -- Patients can update their appointments
  (patient_id IN (
    SELECT id FROM public.patients 
    WHERE user_id = auth.uid()
  ) AND get_user_role() = 'patient')
  OR
  -- Doctors can update appointments they're scheduled for
  (doctor_id IN (
    SELECT id FROM public.doctors 
    WHERE user_id = auth.uid()
  ) AND get_user_role() = 'doctor')
  OR
  -- Admins can update any appointment
  (get_user_role() = 'admin')
); 