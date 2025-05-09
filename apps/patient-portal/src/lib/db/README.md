# Healthify Patient Portal Database Setup

This directory contains utilities and scripts for managing the database structure for the Healthify Patient Portal application.

## Database Structure

The application uses a Supabase PostgreSQL database with the following main tables:

- `users`: Main table for user data, containing user profiles and roles
- `profiles`: Legacy/alternative table for user profiles (some code may reference this)
- `doctor_profiles`: Extended profile information for doctors
- `patients`: Patient-specific information
- `appointments`: Medical appointments
- `health_records`: Patient health records
- `messages`: Communication between patients and doctors
- `prescriptions`: Medication prescriptions
- `audit_logs`: System activity logs

## RLS Policies

Row Level Security (RLS) policies are critical for proper functioning of the application. The application expects the following permissions:

1. Users should be able to access their own data in both `users` and `profiles` tables
2. Authenticated users should have appropriate INSERT, UPDATE, and DELETE permissions

## Common Issues and Solutions

### 403 Forbidden Error

If you encounter a 403 Forbidden error when accessing user profiles, this typically indicates that RLS policies are not correctly set up. To fix this:

1. Navigate to `/admin/database` in the application
2. Use the "Apply Database Fixes" button to attempt an automatic fix
3. If that doesn't work, you can manually apply the SQL from the `fix_rls_policies.sql` file using the Supabase SQL Editor

### Users vs. Profiles Table

The application was originally designed to use a table called `profiles` but has been updated to primarily use `users`. The code contains fallbacks to handle both scenarios, but for optimal operation, ensure both tables have proper RLS policies.

## Manual Setup

If you need to manually set up the database, follow these steps:

1. Go to the Supabase Dashboard SQL Editor
2. Run the migration script from `supabase/migrations/00001_complete_setup.sql`
3. Apply the RLS fixes from `fix_rls_policies.sql`

## Best Practices

- Always back up your database before applying major changes
- Test changes in a development environment before applying to production
- When adding new tables, ensure RLS policies are properly configured
- When debugging database issues, check the console logs for detailed error messages 