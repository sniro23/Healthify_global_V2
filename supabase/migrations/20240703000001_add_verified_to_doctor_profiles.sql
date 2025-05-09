-- Add verified field to doctor_profiles table
ALTER TABLE doctor_profiles
ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false;

-- Create index on verified field for faster queries
CREATE INDEX IF NOT EXISTS idx_doctor_profiles_verified ON doctor_profiles(verified);

-- Update existing rows to have verified = false
UPDATE doctor_profiles SET verified = false WHERE verified IS NULL; 