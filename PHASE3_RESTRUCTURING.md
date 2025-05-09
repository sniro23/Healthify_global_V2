# Phase 3 Restructuring Guide

This document outlines the changes made during Phase 3 restructuring of the Healthify Global project.

## Changes Implemented

1. **UI Kit Consolidation**:
   - All UI components moved to `packages/ui-kit/src/components/ui/`
   - Authentication components moved to `packages/ui-kit/src/components/auth/`
   - Navigation components moved to `packages/ui-kit/src/components/navigation/`
   - EHR components moved to `packages/ui-kit/src/components/ehr/`

2. **Database and FHIR Client Organization**:
   - Authentication logic now in `packages/db/src/auth/`
   - Clean exports from `packages/db/src/index.ts`

3. **App Structure Standardization**:
   - Each portal (doctor, patient, admin) now has:
     - `src/app/` for Next.js app router pages
     - `src/components/` for component files
     - `src/hooks/` for custom hooks
     - `src/utils/` for utility functions
     - `src/styles/` for CSS and styling
     - `public/` for static assets

4. **Module Aliases**:
   - Path mapping set up in each app's `tsconfig.json`
   - Use `@/components/`, `@/hooks/`, etc. for imports

5. **Next.js Configuration**:
   - `transpilePackages` added to properly handle monorepo imports

## Using the New Structure

### Importing Components

```tsx
// Import UI components
import { Button, Card, CardHeader, CardTitle, CardContent } from "@healthify/ui-kit";

// Import auth components
import { LoginForm, RegisterForm } from "@healthify/ui-kit";

// Import from local components
import { SomeComponent } from "@/components/SomeComponent";
```

### Importing Database Functions

```tsx
// Import Supabase client and auth functions
import { getSupabaseClient, signIn, signUp } from "@healthify/db";
```

### Troubleshooting

If you encounter import errors:

1. Make sure you're using the correct import path
2. Run `yarn install` to update dependencies
3. Check that the component exists in the UI kit
4. Use the console to identify the specific import error

## Next Steps

1. Run `yarn install` in the root directory
2. Test each portal to verify imports are working
3. Fix any remaining component references
4. Consider creating any missing components in the UI kit
