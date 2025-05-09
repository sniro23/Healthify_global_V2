# Healthify Patient Portal

A Next.js application for patient healthcare management.

## Database Issue Resolution

This README includes solutions to common database issues encountered when running the patient portal application.

### Key Issues Fixed

1. **Table Name Inconsistencies**: The application was initially built to use a `profiles` table, but the database schema uses `users` as the main user table. We've updated the code to work with both tables.

2. **RLS Policy Errors**: The 403 Forbidden errors when accessing user profiles are caused by missing or incorrect Row Level Security (RLS) policies in Supabase. We've added utilities to fix these policies.

3. **Path Resolution Issues**: We fixed path alias resolution issues in Next.js configuration.

### How to Fix Database Issues

1. **Access the Admin Dashboard:**
   - Go to `/admin` from the homepage
   - Navigate to Database Management

2. **Use the Database Fix Tool:**
   - The Database Administration page provides a tool to apply RLS policy fixes
   - It also includes SQL commands that can be manually executed in the Supabase SQL Editor

3. **Manual SQL Fixes:**
   - If the automated tool doesn't work, copy the SQL from the Database Admin page
   - Open your Supabase project
   - Go to the SQL Editor
   - Paste and run the SQL commands

### Starting the Application

We've included a restart script that handles common startup issues:

```bash
# Make the script executable (one-time)
chmod +x restart.sh

# Run the restart script
./restart.sh
```

The script will:
- Clear the Next.js cache
- Stop any processes using port 3000
- Install dependencies if needed
- Start the development server

### Authentication

The application now handles authentication more robustly:

- The `AuthProvider` has been updated to check both `users` and `profiles` tables
- User role detection tries multiple sources (users table, profiles table, user metadata)
- User creation during signup attempts to write to both tables for maximum compatibility

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Important Files

- `src/lib/auth/AuthProvider.tsx`: Contains the authentication logic
- `src/lib/db/fix_rls_policies.sql`: SQL to fix database permissions
- `src/lib/db/applyDatabaseFixes.ts`: Utility to apply database fixes
- `src/components/admin/DatabaseFixAdmin.tsx`: Admin UI for database management

## Troubleshooting

- If you see 403 Forbidden errors, apply the database fixes
- If imports are failing, clear the `.next` cache and restart
- Check console logs for detailed error messages
- Look at the SQL queries being run for any syntax errors 