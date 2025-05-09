# Fixing Registration 403 Forbidden Issues

You've successfully fixed the login flow, but registration is still failing with 403 Forbidden errors when attempting to insert records into the database. Here's how to fix it:

## Step 1: Run the SQL Fix in Supabase

1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to the SQL Editor
4. Copy and paste the following SQL:

```sql
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
```

5. Run the query

## Step 2: Verify the Policies

Run this query to check that the new policies were created:

```sql
SELECT tablename, policyname, cmd, roles, permissive, qual, with_check
FROM pg_policies
WHERE tablename IN ('users', 'profiles')
ORDER BY tablename, cmd;
```

You should see the new "Anyone can insert..." policies for both tables.

## Step 3: Test Registration

1. Restart your app (if it's already running):
   ```
   cd /Users/niro/Healthify_Global_Rebuild/apps/patient-portal
   rm -rf .next
   npm run dev
   ```

2. Try registering a new user. The 403 errors should be gone, and records should be successfully created in both tables.

## What Changed?

The original INSERT policies were too restrictive, only allowing authenticated users to insert records matching their own ID. But during registration, the user is not yet authenticated when we're trying to create these records.

The new policies allow:
1. Users to insert their own records (auth.uid() = id)
2. Records to be inserted for any user that exists in the auth.users table

This ensures that both authenticated and anonymous users can create records, but only for legitimate user IDs that exist in the auth system. 