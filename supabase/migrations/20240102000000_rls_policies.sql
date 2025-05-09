-- Patient policies
CREATE POLICY "Patients can view their own records"
ON public.patients FOR SELECT
TO authenticated
USING (
  (auth.uid() = user_id AND get_user_role() = 'patient')
  OR
  (get_user_role() IN ('doctor', 'admin'))
);

CREATE POLICY "Patients can update their own records"
ON public.patients FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND get_user_role() = 'patient')
WITH CHECK (auth.uid() = user_id AND get_user_role() = 'patient');

-- Doctor policies
CREATE POLICY "Doctors can view their own records"
ON public.doctors FOR SELECT
TO authenticated
USING (
  (auth.uid() = user_id AND get_user_role() = 'doctor')
  OR
  (get_user_role() = 'admin')
);

CREATE POLICY "Doctors can update their own records"
ON public.doctors FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND get_user_role() = 'doctor')
WITH CHECK (auth.uid() = user_id AND get_user_role() = 'doctor');

-- Appointments policies
CREATE POLICY "Users can view their own appointments"
ON public.appointments FOR SELECT
TO authenticated
USING (
  -- Patients can see their appointments
  (patient_id IN (
    SELECT id FROM public.patients 
    WHERE user_id = auth.uid()
  ) AND get_user_role() = 'patient')
  OR
  -- Doctors can see appointments they're scheduled for
  (doctor_id IN (
    SELECT id FROM public.doctors 
    WHERE user_id = auth.uid()
  ) AND get_user_role() = 'doctor')
  OR
  -- Admins can see all appointments
  (get_user_role() = 'admin')
);

-- Messages policies
CREATE POLICY "Users can view messages they sent or received"
ON public.messages FOR SELECT
TO authenticated
USING (
  sender_id = auth.uid() 
  OR 
  recipient_id = auth.uid()
);

CREATE POLICY "Users can insert messages they send"
ON public.messages FOR INSERT
TO authenticated
WITH CHECK (
  sender_id = auth.uid()
);

-- Health records policies
CREATE POLICY "Users can view authorized health records"
ON public.health_records FOR SELECT
TO authenticated
USING (
  -- Patients can see their own health records
  (patient_id IN (
    SELECT id FROM public.patients 
    WHERE user_id = auth.uid()
  ) AND get_user_role() = 'patient')
  OR
  -- Doctors can see health records of their patients
  (patient_id IN (
    SELECT p.id FROM public.patients p
    JOIN public.appointments a ON p.id = a.patient_id
    WHERE a.doctor_id IN (
      SELECT id FROM public.doctors 
      WHERE user_id = auth.uid()
    )
  ) AND get_user_role() = 'doctor')
  OR
  -- Admins can see all health records
  (get_user_role() = 'admin')
);

-- Prescriptions policies
CREATE POLICY "Users can view authorized prescriptions"
ON public.prescriptions FOR SELECT
TO authenticated
USING (
  -- Patients can see their own prescriptions
  (patient_id IN (
    SELECT id FROM public.patients 
    WHERE user_id = auth.uid()
  ) AND get_user_role() = 'patient')
  OR
  -- Doctors can see prescriptions they created
  (doctor_id IN (
    SELECT id FROM public.doctors 
    WHERE user_id = auth.uid()
  ) AND get_user_role() = 'doctor')
  OR
  -- Admins can see all prescriptions
  (get_user_role() = 'admin')
);

-- Audit logs policies - only admins can see all logs
CREATE POLICY "Admins can view audit logs"
ON public.audit_logs FOR SELECT
TO authenticated
USING (
  get_user_role() = 'admin'
  OR
  (user_id = auth.uid())
); 