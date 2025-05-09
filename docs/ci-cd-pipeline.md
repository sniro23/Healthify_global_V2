# CI/CD Pipeline Documentation

This document outlines the CI/CD pipeline setup for the Healthify Digital Hub project.

## Overview

Our CI/CD pipeline is designed to:
- Validate code quality through linting, testing, and type checking
- Deploy to staging environments for branches pushed to `staging`
- Deploy to production environments for branches pushed to `main`
- Support different environment configurations for staging and production
- Automatically deploy Supabase database migrations

## Pipeline Structure

### Validation Stage

All code changes undergo validation before deployment:
- Linting: Ensures code style consistency
- Testing: Runs unit and integration tests
- Type checking: Verifies TypeScript type correctness

### Deployment Stages

The pipeline deploys three web applications:
1. Patient Portal
2. Doctor Portal
3. Admin Portal

Each portal has its own deployment job that:
- Builds the application with environment-specific configurations
- Deploys to Vercel with the correct environment settings

### Database Deployment

The pipeline automatically deploys Supabase database schema changes:
- Triggered when changes are made to migration files in the `supabase/migrations` directory
- Uses the Supabase CLI to apply migrations to the appropriate environment
- Provides verification and notifications of deployment status

## Environments

The pipeline supports two environments:
- **Staging**: For testing and verification before production
- **Production**: For live, user-facing deployments

Environment variables are dynamically selected based on the target branch:
- `main` branch → Production environment
- `staging` branch → Staging environment

## Required GitHub Secrets

The pipeline requires the following secrets to be configured:
- `VERCEL_TOKEN`: API token for Vercel deployments
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PATIENT_PORTAL_ID`: Vercel project ID for patient portal
- `VERCEL_DOCTOR_PORTAL_ID`: Vercel project ID for doctor portal
- `VERCEL_ADMIN_PORTAL_ID`: Vercel project ID for admin portal
- `PROD_SUPABASE_URL`: Production Supabase URL
- `PROD_SUPABASE_ANON_KEY`: Production Supabase anonymous key
- `STAGING_SUPABASE_URL`: Staging Supabase URL
- `STAGING_SUPABASE_ANON_KEY`: Staging Supabase anonymous key
- `SUPABASE_ACCESS_TOKEN`: Supabase access token for CLI authentication
- `PROD_SUPABASE_PROJECT_ID`: Production Supabase project ID
- `STAGING_SUPABASE_PROJECT_ID`: Staging Supabase project ID
- `SUPABASE_DB_PASSWORD`: Database password for schema migrations

## Workflow Triggers

The frontend deployment pipeline is triggered on:
- Push to `main` or `staging` branches
- Pull requests targeting `main` or `staging` branches

For pull requests, only validation runs are performed, not deployments.

The Supabase deployment pipeline is triggered on:
- Push to `main` or `staging` branches when changes are made to migration files
- This ensures database schema changes are deployed to the correct environment

## Deployment Logic

Deployments only occur for push events (not pull requests) and use:
- Production configuration when pushing to `main`
- Staging configuration when pushing to `staging`

This ensures proper separation between environments and prevents accidental deployments.

## Database Migration Best Practices

When making database schema changes:
1. Create migration files in the `supabase/migrations` directory
2. Test migrations locally using `yarn supabase:migrate`
3. Push changes to either `staging` or `main` branch to trigger automated deployment
4. Monitor deployment notifications for successful application of migrations 