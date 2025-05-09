-- Fix SQL for INSERT permissions
-- This focuses on allowing newly registered users to create their own records

-- Grant all necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

-- Drop existing INSERT policies that might be conflicting
DROP POLICY IF EXISTS "Users can insert own user data" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile data" ON public.profiles;

-- Create more permissive INSERT policies for users table
CREATE POLICY "Anyone can insert user data" 
ON public.users 
FOR INSERT 
TO authenticated, anon
WITH CHECK (
  -- Either it's your own record OR you're creating a new account
  auth.uid() = id OR 
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = public.users.id
  )
);

-- Create more permissive INSERT policies for profiles table
CREATE POLICY "Anyone can insert profile data" 
ON public.profiles 
FOR INSERT 
TO authenticated, anon
WITH CHECK (
  -- Either it's your own record OR you're creating a new account
  auth.uid() = id OR 
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = public.profiles.id
  )
);

-- Make sure we have policies for other operations
-- SELECT policies (already should exist from previous fixes)
CREATE POLICY IF NOT EXISTS "Anyone can select users"
ON public.users FOR SELECT TO public USING (true);

CREATE POLICY IF NOT EXISTS "Anyone can select profiles"
ON public.profiles FOR SELECT TO public USING (true);

-- UPDATE policies
CREATE POLICY IF NOT EXISTS "Users can update own user data"
ON public.users FOR UPDATE TO authenticated
USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can update own profile data"
ON public.profiles FOR UPDATE TO authenticated
USING (auth.uid() = id) WITH CHECK (auth.uid() = id); 