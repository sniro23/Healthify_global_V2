# Project Structure Migration Guide

## Changes Made

1. **UI Kit Components Restructuring**
   - Consolidated UI components under `packages/ui-kit/src/components/ui`
   - Moved auth components to `packages/ui-kit/src/components/auth`
   - Moved EHR components to `packages/ui-kit/src/components/ehr`
   - Updated main index.ts to properly export all components

2. **Module Aliases**
   - Added module aliases in all app tsconfig.json files
   - Added `@healthify/ui-kit`, `@healthify/db`, `@healthify/fhir-server` aliases

3. **App Structure Standardization**
   - Created standard directory structure in each app
   - Added missing global.css and layout.tsx files where needed

4. **Dependencies and Transpilation**
   - Updated package.json files to include workspace dependencies
   - Configured next.config.js to transpile local packages

## Testing After Migration

1. Run `yarn install` to update dependencies
2. Build each app with `yarn build` to check for any errors
3. Test in development mode with `yarn dev`

## Known Issues

If you encounter import errors, check:
1. That the component is properly exported from the UI Kit
2. That the import path is correct (should be `@healthify/ui-kit`)
3. The module alias is correctly configured in tsconfig.json
