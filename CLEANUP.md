# Healthify Project Cleanup Guide

## Current Problem

The Healthify Global project directory structure is currently disorganized with several issues:

1. **Duplicate Code**: The same code exists in both root directories and backup directories.
2. **Inconsistent Structure**: Some apps are in `apps/` while others are in `backup/apps/`.
3. **Missing Components**: The UI Kit is incomplete with missing component implementations.
4. **Import Errors**: Applications fail to build due to unresolvable imports.

## Solution

We've created several scripts to clean up and restructure the project according to the standard monorepo pattern:

### 1. Project Structure Cleanup (`project-cleanup.sh`)

This script reorganizes the project files into a clean structure:

```
healthify-digital-hub/
├── .env.example
├── .gitignore
├── package.json             # root workspace config
├── yarn.lock                # single lockfile
├── tsconfig.base.json       # shared TS config
├── .eslintrc.js             # root ESLint rules
├── tailwind.config.js       # imports ui-kit theme
├── .github/
├── supabase/
└── apps/
    ├── patient-portal/
    ├── doctor-portal/
    ├── admin-portal/
└── packages/
    ├── ui-kit/
    ├── db/
    └── fhir-server/
```

### 2. UI Kit Fixes (`fix-ui-kit.sh`)

This script creates or fixes the UI component library:

- Adds missing component implementations
- Sets up auth module with Supabase integration
- Creates basic auth components (LoginForm, RegisterForm)
- Ensures proper file structure for component imports

## How to Run the Cleanup

1. **Backup Current State** (automatic):
   - The cleanup script will automatically create a backup in `pre_cleanup_backup/`.

2. **Run Project Cleanup**:
   ```
   chmod +x project-cleanup.sh
   ./project-cleanup.sh
   ```

3. **Fix UI Kit Components**:
   ```
   chmod +x fix-ui-kit.sh
   ./fix-ui-kit.sh
   ```

4. **Update Dependencies and Build**:
   ```
   yarn install
   yarn workspace @healthify/ui-kit build
   ```

5. **Test the Applications**:
   ```
   yarn dev:patient
   yarn dev:doctor
   yarn dev:admin
   ```

## Post-Cleanup Tasks

1. **Review Component Implementations**: Some components may need further customization.
2. **Check for Missing Functionality**: Features that existed in the old structure should be ported over.
3. **Fix Remaining Import Issues**: Some imports might still need manual fixes.
4. **Cleanup Backup Directories**: Once everything is working, delete the `backup/` directory to save space.

## File Structure After Cleanup

The project should have a standard monorepo structure:

- Each app (`patient-portal`, `doctor-portal`, `admin-portal`) in the `apps/` directory
- Shared packages (`ui-kit`, `db`, `fhir-server`) in the `packages/` directory
- Database migrations in `supabase/migrations/`
- GitHub workflows in `.github/workflows/`

This clean structure makes it easier to maintain, build, and deploy the application components.

## Troubleshooting

If you encounter issues after running the cleanup scripts:

1. **Missing Files**: Check the `pre_cleanup_backup/` directory for any files that need to be restored.
2. **Build Errors**: Check the component implementation in `packages/ui-kit/`.
3. **Import Issues**: Ensure all package references use `workspace:*` in package.json files.
4. **Runtime Errors**: Reinstall dependencies with `yarn install --force` to ensure proper workspace linking. 