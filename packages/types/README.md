# TypeScript Declaration Files

This directory contains TypeScript declaration files for various packages used in the Healthify project.

## Purpose

These declaration files provide type definitions for:

1. **@healthify/ui-kit**: UI components used across the application
2. **@healthify/shared**: Shared utilities and types
3. **@supabase/auth-helpers-nextjs**: Supabase authentication helpers
4. **resend**: Email sending service

## Usage

These declaration files are automatically included in your TypeScript compilation through the `typeRoots` configuration in your tsconfig.json files.

## Updating Types

If you need to add or update type definitions:

1. Locate the appropriate declaration file in this directory
2. Add the new type definitions following the existing patterns
3. Make sure to export any new types or interfaces

## Adding New Packages

To add type declarations for a new package:

1. Create a new directory under `types/` for the package
2. Create an `index.d.ts` file with appropriate declarations
3. Update the appropriate tsconfig.json file if necessary

## Temporary Solution

These declaration files are a temporary solution until proper workspace dependencies can be established. Eventually, these types should be included directly in their respective packages.
