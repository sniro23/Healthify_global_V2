# GitHub Repository Secrets

This document outlines the GitHub repository secrets required for the CI/CD pipeline to function properly.

## Overview

GitHub repository secrets are used to securely store sensitive information like API tokens, passwords, and other credentials needed by the CI/CD workflows. These secrets are encrypted and only exposed to specific GitHub Actions.

## Required Secrets

The following secrets need to be configured in your GitHub repository settings:

### Vercel Deployment

| Secret Name | Description |
|-------------|-------------|
| `VERCEL_TOKEN` | API token for authenticating with Vercel |
| `VERCEL_ORG_ID` | Vercel organization ID |
| `VERCEL_PATIENT_PORTAL_ID` | Vercel project ID for the patient portal |
| `VERCEL_DOCTOR_PORTAL_ID` | Vercel project ID for the doctor portal |
| `VERCEL_ADMIN_PORTAL_ID` | Vercel project ID for the admin portal |

### Supabase Configuration

| Secret Name | Description |
|-------------|-------------|
| `SUPABASE_ACCESS_TOKEN` | Supabase access token for CLI authentication |
| `PROD_SUPABASE_PROJECT_ID` | Production Supabase project ID |
| `STAGING_SUPABASE_PROJECT_ID` | Staging Supabase project ID |
| `SUPABASE_DB_PASSWORD` | Database password for schema migrations |
| `PROD_SUPABASE_URL` | Production Supabase project URL |
| `PROD_SUPABASE_ANON_KEY` | Production Supabase anonymous key |
| `STAGING_SUPABASE_URL` | Staging Supabase project URL |
| `STAGING_SUPABASE_ANON_KEY` | Staging Supabase anonymous key |

### Notification Services (Optional)

| Secret Name | Description |
|-------------|-------------|
| `SLACK_WEBHOOK_URL` | Webhook URL for Slack notifications |

## Setting Up Secrets

To set up these secrets in your GitHub repository:

1. Navigate to your GitHub repository
2. Go to "Settings" > "Secrets and variables" > "Actions"
3. Click on "New repository secret"
4. Enter the name and value of the secret
5. Click "Add secret"

Repeat this process for all required secrets.

## Obtaining Secret Values

### Vercel

1. Log in to your Vercel account
2. Go to "Settings" > "Tokens"
3. Create a new token with appropriate permissions
4. Copy the token value for `VERCEL_TOKEN`
5. For project IDs, go to the project settings in Vercel and copy the project ID

### Supabase

1. Log in to your Supabase account
2. Navigate to the project settings
3. Copy the project URL for `SUPABASE_URL`
4. Copy the anonymous key for `SUPABASE_ANON_KEY`
5. For the access token, go to your account settings > API tokens
6. Create a new token with appropriate permissions
7. Copy the token value for `SUPABASE_ACCESS_TOKEN`

## Security Considerations

- Regularly rotate your tokens and update the GitHub secrets accordingly
- Use the principle of least privilege when creating tokens
- Monitor access to your GitHub repository and its secrets 