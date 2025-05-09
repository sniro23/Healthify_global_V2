-- Drop triggers if they exist (only if the tables exist)
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'users') THEN
        DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
    END IF;
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'auth' AND tablename = 'users') THEN
        DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    END IF;
END $$;

-- Drop functions if they exist
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop existing tables if they exist (in correct order due to dependencies)
DROP TABLE IF EXISTS public.audit_logs CASCADE;
DROP TABLE IF EXISTS public.prescriptions CASCADE;
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.health_records CASCADE;
DROP TABLE IF EXISTS public.appointments CASCADE;
DROP TABLE IF EXISTS public.doctor_profiles CASCADE;
DROP TABLE IF EXISTS public.patients CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- Create users table
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    role TEXT CHECK (role IN ('patient', 'doctor', 'admin')) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create doctor_profiles table
CREATE TABLE public.doctor_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) NOT NULL UNIQUE,
    title TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    specialties TEXT[] NOT NULL DEFAULT '{}',
    license_number TEXT NOT NULL,
    license_state TEXT NOT NULL,
    npi_number TEXT,
    board_certifications TEXT[] DEFAULT '{}',
    education JSONB DEFAULT '{}',
    bio TEXT,
    languages TEXT[] DEFAULT '{}',
    accepting_new_patients BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create patients table
CREATE TABLE public.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    gender TEXT,
    phone TEXT,
    address JSONB DEFAULT '{}',
    emergency_contact JSONB DEFAULT '{}',
    medical_history JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.patients(id) NOT NULL,
    doctor_id UUID REFERENCES public.doctor_profiles(id) NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    status TEXT CHECK (status IN ('scheduled', 'cancelled', 'completed', 'no-show')) NOT NULL DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_appointment_time CHECK (end_time > start_time)
);

-- Create health_records table
CREATE TABLE public.health_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.patients(id) NOT NULL,
    doctor_id UUID REFERENCES public.doctor_profiles(id) NOT NULL,
    visit_date TIMESTAMPTZ NOT NULL,
    diagnosis TEXT NOT NULL,
    treatment TEXT,
    prescription TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create messages table
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES public.users(id) NOT NULL,
    receiver_id UUID REFERENCES public.users(id) NOT NULL,
    content TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create prescriptions table
CREATE TABLE public.prescriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.patients(id) NOT NULL,
    doctor_id UUID REFERENCES public.doctor_profiles(id) NOT NULL,
    medication TEXT NOT NULL,
    dosage TEXT NOT NULL,
    frequency TEXT NOT NULL,
    duration TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create audit_logs table
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) NOT NULL,
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id UUID NOT NULL,
    details JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Users can view own data" ON public.users;
    DROP POLICY IF EXISTS "Users can update own data" ON public.users;
    DROP POLICY IF EXISTS "Public can view verified doctors" ON public.doctor_profiles;
    DROP POLICY IF EXISTS "Doctors can update own profile" ON public.doctor_profiles;
    DROP POLICY IF EXISTS "Patients can view own profile" ON public.patients;
    DROP POLICY IF EXISTS "Doctors can view patient profiles" ON public.patients;
    DROP POLICY IF EXISTS "Users can view own appointments" ON public.appointments;
    DROP POLICY IF EXISTS "Users can view own health records" ON public.health_records;
    DROP POLICY IF EXISTS "Users can view own messages" ON public.messages;
    DROP POLICY IF EXISTS "Users can send messages" ON public.messages;
    DROP POLICY IF EXISTS "Users can view own prescriptions" ON public.prescriptions;
EXCEPTION
    WHEN undefined_table THEN
        NULL;
END $$;

-- Create policies for users table
CREATE POLICY "Users can view own data" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Create policies for doctor_profiles table
CREATE POLICY "Public can view verified doctors" ON public.doctor_profiles
    FOR SELECT USING (is_verified = true);

CREATE POLICY "Doctors can update own profile" ON public.doctor_profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'doctor'
            AND user_id = auth.uid()
        )
    );

-- Create policies for patients table
CREATE POLICY "Patients can view own profile" ON public.patients
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Doctors can view patient profiles" ON public.patients
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'doctor'
        )
    );

-- Create policies for appointments
CREATE POLICY "Users can view own appointments" ON public.appointments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.patients WHERE user_id = auth.uid() AND id = patient_id
        ) OR
        EXISTS (
            SELECT 1 FROM public.doctor_profiles WHERE user_id = auth.uid() AND id = doctor_id
        )
    );

-- Create policies for health_records
CREATE POLICY "Users can view own health records" ON public.health_records
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.patients WHERE user_id = auth.uid() AND id = patient_id
        ) OR
        EXISTS (
            SELECT 1 FROM public.doctor_profiles WHERE user_id = auth.uid() AND id = doctor_id
        )
    );

-- Create policies for messages
CREATE POLICY "Users can view own messages" ON public.messages
    FOR SELECT USING (auth.uid() IN (sender_id, receiver_id));

CREATE POLICY "Users can send messages" ON public.messages
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Create policies for prescriptions
CREATE POLICY "Users can view own prescriptions" ON public.prescriptions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.patients WHERE user_id = auth.uid() AND id = patient_id
        ) OR
        EXISTS (
            SELECT 1 FROM public.doctor_profiles WHERE user_id = auth.uid() AND id = doctor_id
        )
    );

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create updated_at triggers for all tables
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_doctor_profiles_updated_at
    BEFORE UPDATE ON public.doctor_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patients_updated_at
    BEFORE UPDATE ON public.patients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
    BEFORE UPDATE ON public.appointments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_health_records_updated_at
    BEFORE UPDATE ON public.health_records
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at
    BEFORE UPDATE ON public.messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prescriptions_updated_at
    BEFORE UPDATE ON public.prescriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle user creation (must be last to avoid dependency issues)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, role)
    VALUES (new.id, new.email, 'patient');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup (must be last)
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 