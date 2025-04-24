// FHIR Client
export * from './client';

// Resource services
export * from './resources/appointment';
export * from './resources/capability-statement';
// These will be populated as more services are migrated
// export * from './resources/patient';
// export * from './resources/observation';
// export * from './resources/condition';
// export * from './resources/medication';
// export * from './resources/diagnostic-report';

// Auth
export * from './auth/smart-auth';

// Utils
export * from './utils/audit';
export * from './utils/bundle';

// Types
export * from './types';

// Note: These exports will be populated as services are migrated
// For now they are placeholders 