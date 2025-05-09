# Environment Setup Guide

This document outlines how to set up and manage environment variables for the Healthify Digital Hub project.

## Overview

Environment variables are used to configure the application for different environments (development, test, production) and to store sensitive information like API keys and secrets.

The Healthify Digital Hub uses a strict environment validation system to ensure all required variables are present and formatted correctly.

## Environment Variable Schema

All environment variables are validated against a schema defined in `packages/shared/src/env.ts`. This ensures type safety and prevents runtime errors due to missing or incorrectly formatted environment variables.

## Environment Files

We use the following environment files:

### `.env.development` (Local Development)

```
# Database
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-local-service-role-key

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=development-nextauth-secret-at-least-32-chars

# FHIR Server
NEXT_PUBLIC_FHIR_BASE_URL=http://localhost:8000/fhir
FHIR_BASE_URL=http://localhost:8000/fhir

# Client Configuration
NEXT_PUBLIC_AUTH_ORIGIN=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_ENABLE_TELEHEALTH=true
NEXT_PUBLIC_ENABLE_PAYMENTS=true

# Development Settings
NODE_ENV=development
```

### `.env.test` (Testing Environment)

```
# Database
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=test-anon-key
SUPABASE_SERVICE_ROLE_KEY=test-service-role-key

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=test-nextauth-secret-at-least-32-chars

# FHIR Server
NEXT_PUBLIC_FHIR_BASE_URL=http://localhost:8000/fhir
FHIR_BASE_URL=http://localhost:8000/fhir

# Client Configuration
NEXT_PUBLIC_AUTH_ORIGIN=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_ENABLE_TELEHEALTH=false
NEXT_PUBLIC_ENABLE_PAYMENTS=false

# Test Settings
NODE_ENV=test
```

### `.env.production` (Production Environment)

This file should be empty, as all production environment variables are set through CI/CD and deployment platforms.

## Local Development Setup

1. Create a `.env.local` file in each app directory based on the `.env.development` template
2. Update any values that need to be customized for your local environment
3. Start the development server: `yarn dev`

## Adding New Environment Variables

When adding new environment variables:

1. Add the variable to the appropriate schema in `packages/shared/src/env.ts`
2. Add the variable to the `.env.development` and `.env.test` templates
3. Update the CI/CD pipeline to include the new variable
4. Document the variable in this guide

## Environment Variables in CI/CD

Environment variables in CI/CD are managed through GitHub repository secrets and passed to the workflow at runtime.

For more information about GitHub secrets, see the [GitHub Repository Secrets](./github-secrets.md) documentation.

## Troubleshooting

### Missing Environment Variables

If you see an error like:

```
❌ Invalid server environment variables: { SOME_VAR: [ 'Required' ] }
```

It means a required environment variable is missing. Check your `.env.local` file and add the missing variable.

### Invalid Environment Variables

If you see an error like:

```
❌ Invalid server environment variables: { SOME_URL: [ 'Invalid url' ] }
```

It means an environment variable has an invalid format. Check the value and ensure it matches the expected format.

## Environment Variable Best Practices

1. **Never commit sensitive environment variables** to the repository
2. Use different values for different environments
3. Limit access to production environment variables
4. Rotate secrets regularly
5. Use the least privilege principle when setting up service accounts and API keys 