# Database Deployment Guide

This document provides an overview of the database deployment process for the Healthify Digital Hub project.

## Overview

The Healthify Digital Hub application uses Supabase as its primary database solution. Supabase provides a PostgreSQL database with additional features like authentication, storage, and real-time subscriptions.

Our database deployment process is integrated into our CI/CD pipeline, ensuring consistent and automated deployments to staging and production environments.

## Key Documentation

Please refer to the following documents for detailed information:

1. [Supabase Configuration Guide](../supabase/README.md) - Details on Supabase setup and migration management
2. [SQL Standards and Best Practices](./sql-standards.md) - Conventions and best practices for SQL development
3. [CI/CD Pipeline Documentation](./ci-cd-pipeline.md) - Information about the overall deployment process
4. [GitHub Repository Secrets](./github-secrets.md) - Required secrets for database deployments

## Deployment Flow

The database deployment process follows these steps:

1. Developers create and test migrations locally using `yarn supabase:new-migration`
2. Migrations are committed and pushed to GitHub
3. The CI/CD pipeline validates the SQL files (syntax, best practices)
4. When merged to staging/main, migrations are automatically deployed to the corresponding environment
5. Deployment notifications are sent to the team

## Local Development

To develop and test database changes locally:

1. Install the Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Start the local Supabase instance:
   ```bash
   yarn supabase:start
   ```

3. Create a new migration:
   ```bash
   yarn supabase:new-migration "Description of your changes"
   ```

4. Edit the generated migration file in `supabase/migrations/`

5. Apply the migration locally:
   ```bash
   yarn supabase:migrate
   ```

6. Test your changes in the local environment

7. Commit and push your changes

## Environments

The Healthify Digital Hub project uses three database environments:

1. **Development** - Local Supabase instance for development
2. **Staging** - Staging Supabase project for testing
3. **Production** - Production Supabase project for live application

Each environment has its own configuration, controlled by environment variables in the CI/CD pipeline.

## Deployment Frequency

- **Staging** - Deployed on every merge to the staging branch
- **Production** - Deployed on every merge to the main branch

## Rollback Process

In case of database deployment issues:

1. Create a new migration that reverts the problematic changes
2. Test the rollback migration locally
3. Push the rollback migration to the appropriate branch
4. Monitor the deployment to ensure successful rollback

## Troubleshooting

For common database deployment issues and their solutions, refer to the [Troubleshooting section](../supabase/README.md#troubleshooting) in the Supabase Configuration guide.

## Security Considerations

Database security is critical for protecting patient data. Be sure to:

1. Always enable Row Level Security (RLS) on tables
2. Test security policies thoroughly
3. Follow the principle of least privilege
4. Protect database credentials through proper secret management

## Contact

For database-related questions or issues, contact the database team via the `#database` channel on Slack. 