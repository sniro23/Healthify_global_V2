# Healthify Global Healthcare Platform

A comprehensive healthcare platform consisting of patient, doctor, and admin portals built on a unified FHIR-compliant backend.

## Project Structure

This is a monorepo containing multiple applications and shared packages:

```
healthify-digital-hub/
├── apps/
│   ├── patient-portal/    # Patient-facing web app
│   ├── doctor-portal/     # Doctor-facing web app
│   └── admin-portal/      # Admin dashboard
├── packages/
│   ├── ui-kit/            # Shared UI components
│   ├── fhir-server/       # FHIR API implementation
│   ├── db/                # Database access layer
│   └── auth/              # Authentication utilities
└── supabase/              # Supabase migrations and schema
```

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager
- Supabase CLI (for local development with the database)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/sniro23/Healthify_global_V2.git
   cd Healthify_Global_Rebuild/healthify-digital-hub
   ```

2. Install dependencies:
   ```
   yarn install
   ```

3. Create a `.env.local` file in the root with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_PROJECT_ID=your-project-id
   ```

4. Start the development server:
   ```
   yarn dev
   ```

### Running Individual Applications

To run a specific application:

```
yarn workspace @healthify/patient-portal dev
yarn workspace @healthify/doctor-portal dev
yarn workspace @healthify/admin-portal dev
```

## Development Guidelines

### Preferred Technologies

- **Framework**: Next.js for all portals
- **State Management**: React Context API + React Query
- **Styling**: Tailwind CSS + UI Kit components
- **API**: FHIR R4 standard with REST endpoints
- **Database**: Supabase (Postgres) with Row-Level Security

### Code Structure

- Components should follow a feature-first organization
- Shared components go in the UI Kit package
- Business logic should be separated from UI components
- FHIR resources should be implemented according to the FHIR R4 standard

## Database Migrations

To start Supabase locally and apply migrations:

```
yarn supabase:start
yarn supabase:migrate
```

## Security

- All database access is protected by Row-Level Security policies
- Authentication is handled by Supabase Auth
- PHI (Protected Health Information) is encrypted at rest
- All actions are audit-logged for compliance

## Testing

Run tests across all workspaces:

```
yarn test
```

## Deployment

The application is automatically deployed to Vercel through GitHub Actions when changes are pushed to the main branch.
