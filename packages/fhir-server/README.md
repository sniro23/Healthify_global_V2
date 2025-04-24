# @healthify/fhir-server

FHIR API server implementation for Healthify Global application.

## Overview

This package provides FHIR-compliant API endpoints and services for managing healthcare data within the Healthify application ecosystem. It implements the FHIR R4 standard and integrates with Supabase for data storage.

## Features

- FHIR R4 resource implementations
- Authentication and authorization
- Audit logging
- Search capabilities
- CRUD operations for resources

## Main Components

### Services

- `PatientService`: Manages patient resources
- `ObservationService`: Handles vital signs and lab results
- `ConditionService`: Manages medical conditions
- `MedicationRequestService`: Handles prescriptions
- `AppointmentService`: Manages appointments
- `DiagnosticReportService`: Handles lab reports and imaging studies

### Utilities

- `FHIRUtils`: Helper functions for FHIR data manipulation
- `AuditLogger`: Logs all operations for compliance
- `QueryBuilder`: Builds FHIR-compliant search queries

## Usage

```tsx
import { createFHIRClient } from '@healthify/fhir-server';

// Create a FHIR client
const client = createFHIRClient({
  baseUrl: 'https://api.healthify.com/fhir',
  auth: {
    token: 'user-auth-token',
  },
});

// Get a patient by ID
const patient = await client.getPatient('patient-id');

// Search for observations
const observations = await client.searchObservations({
  patient: 'patient-id',
  code: 'blood-pressure',
  date: 'gt2023-01-01',
});
```

## Development

### Adding a new resource

1. Create a new service file in the `src/services` directory
2. Implement the required FHIR operations (read, search, create, etc.)
3. Add the service to the client in `src/client.ts`
4. Add tests for the service

### Security

All services implement row-level security policies and audit logging to ensure data privacy and compliance with healthcare regulations. 