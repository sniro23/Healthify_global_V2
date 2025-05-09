// Import FHIR types
import type {
  Patient as FHIRPatient,
  MedicationRequest,
  Observation as FHIRObservation,
  Condition as FHIRCondition,
} from '@healthify/fhir-types';

// Re-export FHIR types with any UI-specific extensions
export interface Patient extends FHIRPatient {
  // Add any UI-specific fields here
  avatarUrl?: string;
}

export interface Medication extends MedicationRequest {
  // Add any UI-specific fields here
  lastRefillDate?: string;
  nextRefillDate?: string;
}

export interface Observation extends FHIRObservation {
  // Add any UI-specific fields here
  trendDirection?: 'up' | 'down' | 'stable';
  normalRange?: {
    min: number;
    max: number;
    unit: string;
  };
}

export interface Condition extends FHIRCondition {
  // Add any UI-specific fields here
  severity?: 'mild' | 'moderate' | 'severe';
  lastUpdated?: string;
}

export type {
  MedicationRequest,
}; 