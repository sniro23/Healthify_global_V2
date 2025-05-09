# Healthify Digital Hub - Dependency Fixes

## Changes Made

1. **Updated Workspace Configuration**
   - Modified root `package.json` to include all packages under `packages/*`
   - Replaced all `workspace:*` references in app `package.json` files with specific versions (`^0.1.0`)

2. **FHIR Types Dependency**
   - Updated `@fhir-typescript/r4-core` from `^0.10.0` to `0.0.12-beta.18` for compatibility

3. **Supabase Auth Migration**
   - Replaced `@supabase/auth-helpers-nextjs` with `@supabase/ssr` in package.json files
   - Created a migration script to update import statements

## Migration Status

1. **Dependency Installation**
   - Successfully ran `yarn install` with the updated configuration
   - The lockfile is now regenerated and compatible with Yarn 1.x

2. **Code Migration Script**
   - Created `scripts/migrate-supabase-auth.sh` to automate import updates
   - The script will update import paths from `@supabase/auth-helpers-nextjs` to `@supabase/ssr`
   - It also updates method names like `createServerComponentClient` to `createServerClient`

## Manual Updates Required

Some files may require manual updates due to API changes:

1. **Supabase Provider Files**
   - Check custom provider implementations in each app
   - Look for `/lib/supabase/provider` or similar utility files

2. **Custom Auth Hooks**
   - Update any custom auth hooks that utilize the old Supabase helpers
   - Pay special attention to session management and authentication logic

## Testing Instructions

1. After running the migration script, build each app one at a time:
   ```bash
   yarn workspace @healthify/doctor-portal build
   yarn workspace @healthify/admin-portal build
   yarn workspace @healthify/patient-portal build
   ```

2. Resolve any build errors related to:
   - Missing `@healthify/shared` imports
   - Supabase auth method signature changes
   - Incorrect import paths

3. Test the authentication flow in each app to ensure everything works correctly

## Future Enhancements

1. Consider upgrading to Yarn Berry for better workspace management
2. Update ESLint to v9+ as suggested in the warnings during installation 