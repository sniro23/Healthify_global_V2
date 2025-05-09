# Healthify Digital Hub

A modern healthcare platform for connecting patients with providers through telehealth, appointment scheduling, and electronic health records.

## Project Structure

This project is a monorepo containing multiple applications and shared packages:

### Apps

- `apps/patient-portal`: Patient-facing web application
- `apps/doctor-portal`: Healthcare provider web application
- `apps/admin-portal`: Administrative dashboard

### Packages

- `packages/ui-kit`: Shared UI components and design system
- `packages/fhir-server`: FHIR-compatible API server and data models
- `packages/db`: Database schema and client
- `packages/shared`: Shared utilities and configuration

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn 1.22+
- Supabase CLI (for local development)

### Setup

1. Clone the repository:

```sh
git clone https://github.com/your-org/healthify-digital-hub.git
cd healthify-digital-hub
```

2. Install dependencies:

```sh
yarn install
```

3. Set up environment variables:

```sh
cp .env.example .env.local
```

Edit the `.env.local` file with your configuration values. See [Environment Setup Guide](./docs/ENV_SETUP.md) for details.

4. Start Supabase local development:

```sh
yarn supabase:start
```

5. Run migrations:

```sh
yarn supabase:migrate
```

### Development

To run all applications in development mode:

```sh
yarn dev
```

Or run individual applications:

```sh
yarn dev:patient  # Run patient portal
yarn dev:doctor   # Run doctor portal
yarn dev:admin    # Run admin portal
```

### Building for Production

```sh
yarn build
```

## Testing

```sh
yarn test
```

## Database & Security

The Healthify Digital Hub uses Supabase with Row Level Security (RLS) to ensure data privacy and security. See the [Database Security Guide](./docs/database-security.md) for details on our security model.

### Creating Database Migrations

To create a new database migration:

```sh
yarn supabase:new-migration "Description of the migration"
```

Edit the generated file in the `supabase/migrations` directory, then apply it:

```sh
yarn supabase:migrate
```

## Deployment

The application is deployed using a CI/CD pipeline with GitHub Actions. See the [CI/CD Pipeline Documentation](./docs/ci-cd-pipeline.md) for details.

## Project Standards

- TypeScript for type safety
- Next.js for all portal applications
- Tailwind CSS for styling (with shared theme in ui-kit)
- Supabase for authentication and data storage
- FHIR standard for healthcare data
- Environment validation with Zod
- Comprehensive Row Level Security policies
- Automated CI/CD with GitHub Actions

## Documentation

- [Environment Setup Guide](./docs/ENV_SETUP.md)
- [Database Security Guide](./docs/database-security.md)
- [CI/CD Pipeline Documentation](./docs/ci-cd-pipeline.md)
- [Architecture Decision Records](./docs/adr/README.md)
- [GitHub Repository Secrets](./docs/github-secrets.md)
- [SQL Standards](./docs/sql-standards.md)

## License

[License information]
