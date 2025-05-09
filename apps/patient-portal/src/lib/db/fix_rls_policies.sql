-- Ensure RLS is enabled on the tables
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.users ENABLE ROW LEVEL SECURITY;

-- Grant usage on the public schema to authenticated and anon roles
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;

-- Grant SELECT, INSERT, UPDATE, DELETE permissions on tables to the authenticated role.
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.users TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.profiles TO authenticated;

-- Also grant basic SELECT permissions to anon for login purposes
GRANT SELECT ON TABLE public.users TO anon;
GRANT SELECT ON TABLE public.profiles TO anon;

-- --- POLICIES FOR 'users' TABLE ---

-- Drop all potentially conflicting existing policies on 'users'
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
DROP POLICY IF EXISTS "Users can select own user data" ON public.users;
DROP POLICY IF EXISTS "Users can update own data" ON public.users;
DROP POLICY IF EXISTS "Users can update own user data" ON public.users;
DROP POLICY IF EXISTS "Users can insert own data" ON public.users;
DROP POLICY IF EXISTS "Users can insert own user data" ON public.users;

-- Policy: Everyone can read user data (for login/authentication)
CREATE POLICY "Anyone can select users"
ON public.users
FOR SELECT
TO public
USING (true);

-- Policy: Authenticated users can update their own data in the 'users' table
CREATE POLICY "Users can update own user data"
ON public.users
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Policy: Authenticated users can insert their own data into 'users' table
CREATE POLICY "Users can insert own user data"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- --- POLICIES FOR 'profiles' TABLE ---

-- Drop all potentially conflicting existing policies on 'profiles'
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can select own profile data" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile data" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile data" ON public.profiles;

-- Policy: Everyone can read profile data (for login/authentication)
CREATE POLICY "Anyone can select profiles"
ON public.profiles
FOR SELECT
TO public
USING (true);

-- Policy: Authenticated users can update their own data in the 'profiles' table
CREATE POLICY "Users can update own profile data"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Policy: Authenticated users can insert their own data into 'profiles' table
CREATE POLICY "Users can insert own profile data"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id); 