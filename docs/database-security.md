# Database Security Guide

This document outlines the security model implemented in the Healthify Digital Hub database using Supabase Row Level Security (RLS) policies.

## Overview

Database security is a critical aspect of our healthcare application. We use Supabase's Row Level Security (RLS) to ensure that users only have access to data they're authorized to see, based on their role and relationships within the system.

## User Roles

The security model is built around three primary user roles:

1. **Patients**: End-users of the healthcare service
2. **Doctors**: Healthcare providers who treat patients
3. **Admins**: Administrative users with elevated permissions

## Helper Functions

To facilitate RLS implementation, we use a set of helper functions that encapsulate common security checks:

```sql
-- Check if user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Check if user is a doctor
CREATE OR REPLACE FUNCTION public.is_doctor()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM doctors
    WHERE user_id = auth.uid()
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Check if user is a patient
CREATE OR REPLACE FUNCTION public.is_patient()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM patients
    WHERE user_id = auth.uid()
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Check if doctor has a relationship with a patient
CREATE OR REPLACE FUNCTION public.doctor_has_patient(patient_id uuid)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM doctor_patient_relationships dpr
    JOIN doctors d ON d.id = dpr.doctor_id
    WHERE d.user_id = auth.uid()
    AND dpr.patient_id = $1
  );
$$ LANGUAGE sql SECURITY DEFINER;
```

## RLS Policies by Table

### Appointments

```sql
-- Doctors can see appointments assigned to them
CREATE POLICY "Doctors can view their appointments" ON public.appointments
  FOR SELECT USING (
    is_doctor() AND doctor_id IN (
      SELECT id FROM doctors WHERE user_id = auth.uid()
    )
  );

-- Patients can see their own appointments
CREATE POLICY "Patients can view their appointments" ON public.appointments
  FOR SELECT USING (
    is_patient() AND patient_id IN (
      SELECT id FROM patients WHERE user_id = auth.uid()
    )
  );

-- Admins can see all appointments
CREATE POLICY "Admins can view all appointments" ON public.appointments
  FOR SELECT USING (
    is_admin()
  );
```

### Messages

```sql
-- Users can see messages they're involved in
CREATE POLICY "Users can view their messages" ON public.messages
  FOR SELECT USING (
    sender_id IN (
      SELECT id FROM users WHERE user_id = auth.uid()
    ) OR recipient_id IN (
      SELECT id FROM users WHERE user_id = auth.uid()
    )
  );

-- Users can send messages
CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (
    sender_id IN (
      SELECT id FROM users WHERE user_id = auth.uid()
    )
  );
```

### Prescriptions

```sql
-- Patients can view their prescriptions
CREATE POLICY "Patients can view their prescriptions" ON public.prescriptions
  FOR SELECT USING (
    is_patient() AND patient_id IN (
      SELECT id FROM patients WHERE user_id = auth.uid()
    )
  );

-- Doctors can manage prescriptions they created
CREATE POLICY "Doctors can manage prescriptions they created" ON public.prescriptions
  FOR ALL USING (
    is_doctor() AND doctor_id IN (
      SELECT id FROM doctors WHERE user_id = auth.uid()
    )
  );
```

### Diagnostic Reports

```sql
-- Patients can view their reports
CREATE POLICY "Patients can view their reports" ON public.diagnostic_reports
  FOR SELECT USING (
    is_patient() AND patient_id IN (
      SELECT id FROM patients WHERE user_id = auth.uid()
    )
  );

-- Doctors can view reports of their patients
CREATE POLICY "Doctors can view their patients' reports" ON public.diagnostic_reports
  FOR SELECT USING (
    is_doctor() AND doctor_has_patient(patient_id)
  );
```

### Notifications

```sql
-- Users can only see their notifications
CREATE POLICY "Users can view their notifications" ON public.notifications
  FOR SELECT USING (
    user_id = auth.uid()
  );

-- Admins can create notifications for any user
CREATE POLICY "Admins can create notifications" ON public.notifications
  FOR INSERT WITH CHECK (
    is_admin()
  );
```

## Security Principles

Our RLS policies are built around the following security principles:

1. **Least Privilege**: Users have the minimum access required for their role
2. **Separation of Concerns**: Policies are defined separately for each operation type (SELECT, INSERT, UPDATE, DELETE)
3. **Defense in Depth**: Multiple layers of security checking
4. **Explicit Denials**: Default deny, with explicit allows for authorized access

## Testing RLS Policies

To test RLS policies:

1. Start a local Supabase instance
2. Create test users with different roles
3. Use the Supabase SQL editor to impersonate different users:

```sql
-- Set the role for testing
SET LOCAL ROLE authenticated;
-- Set the user ID for testing
SET LOCAL request.jwt.claims TO '{"sub": "user-id-here", "role": "patient"}';
-- Try to query a table
SELECT * FROM appointments;
```

## Security Considerations

1. **Never bypass RLS**: Always access the database through the authenticated Supabase client
2. **Never expose service role keys**: The service role key bypasses RLS
3. **Test thoroughly**: Ensure policies work as expected for all roles and edge cases
4. **Audit regularly**: Periodically review and test RLS policies for security gaps

## Future Enhancements

Planned security enhancements include:

1. Implementing audit logging for sensitive operations
2. Adding time-based access controls for temporary permissions
3. Enhancing security for third-party integrations 