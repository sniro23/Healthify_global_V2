# Healthify Patient Portal

The patient-facing web application for the Healthify Global healthcare platform.

## Overview

This portal allows patients to:

- View and manage appointments
- Access medical records and lab results
- Communicate with healthcare providers through secure messaging
- Complete an onboarding process to gather medical history information
- View and manage prescriptions
- Update personal information and insurance details

## Technology Stack

- **Framework**: Next.js with TypeScript
- **UI Components**: @healthify/ui-kit
- **Data Storage**: Supabase
- **Healthcare Data**: FHIR-compliant API (@healthify/fhir-server)
- **Authentication**: Supabase Auth with row-level security
- **Styling**: Tailwind CSS

## Application Structure

- `/app`: Next.js app router pages
- `/components`: React components organized by feature
- `/integrations`: Integration with external services (Supabase, etc.)
- `/styles`: Global styles and Tailwind configuration

## Key Components

- **Onboarding Flow**: Multi-step process for collecting patient information
- **Appointment Booking**: Calendar interface for scheduling appointments
- **Health Records**: Display and organization of patient medical data
- **Messaging**: Real-time chat with healthcare providers
- **Lab Reports**: Display and interpretation of laboratory results

## Development

### Getting Started

1. Install dependencies:
   ```
   yarn install
   ```

2. Start the development server:
   ```
   yarn dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the application

### Building for Production

```
yarn build
```

## Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Deployment

The application is automatically deployed to Vercel through GitHub Actions when changes are pushed to the main branch. 