import type { Patient as FHIRPatient, MedicationRequest, Observation as FHIRObservation, Condition as FHIRCondition } from '@healthify/fhir-types';
export interface Patient extends FHIRPatient {
    avatarUrl?: string;
}
export interface Medication extends MedicationRequest {
    lastRefillDate?: string;
    nextRefillDate?: string;
}
export interface Observation extends FHIRObservation {
    trendDirection?: 'up' | 'down' | 'stable';
    normalRange?: {
        min: number;
        max: number;
        unit: string;
    };
}
export interface Condition extends FHIRCondition {
    severity?: 'mild' | 'moderate' | 'severe';
    lastUpdated?: string;
}
export type { MedicationRequest, };
//# sourceMappingURL=ehr.d.ts.map