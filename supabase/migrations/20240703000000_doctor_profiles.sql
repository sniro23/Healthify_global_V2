-- Create doctor_profiles table
CREATE TABLE IF NOT EXISTS doctor_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    specialties TEXT[] NOT NULL,
    license_number TEXT NOT NULL,
    license_state TEXT NOT NULL,
    npi_number TEXT NOT NULL,
    board_certifications TEXT[],
    education JSONB,
    bio TEXT NOT NULL,
    languages TEXT[],
    accepting_new_patients BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE doctor_profiles ENABLE ROW LEVEL SECURITY;

-- Doctors can view their own profile
CREATE POLICY "Doctors can view their own profile" ON doctor_profiles
    FOR SELECT USING (
        auth.uid() = user_id
    );

-- Doctors can update their own profile
CREATE POLICY "Doctors can update their own profile" ON doctor_profiles
    FOR UPDATE USING (
        auth.uid() = user_id
    );

-- Doctors can insert their own profile
CREATE POLICY "Doctors can insert their own profile" ON doctor_profiles
    FOR INSERT WITH CHECK (
        auth.uid() = user_id
    );

-- Admin users can view all doctor profiles
CREATE POLICY "Admins can view all doctor profiles" ON doctor_profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.role = 'admin'
        )
    );

-- Admin users can update all doctor profiles
CREATE POLICY "Admins can update all doctor profiles" ON doctor_profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.role = 'admin'
        )
    );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_doctor_profiles_updated_at
    BEFORE UPDATE ON doctor_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 