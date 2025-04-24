// Re-export FHIR types
export { Patient, Observation, Condition, MedicationRequest, DiagnosticReport } from '@fhir-typescript/r4-core';

/**
 * Common FHIR search parameters
 */
export interface FHIRSearchParams {
  [key: string]: string | string[] | undefined;
}

/**
 * FHIR Operation outcomes 
 */
export interface OperationOutcome {
  resourceType: 'OperationOutcome';
  issue: Array<{
    severity: 'fatal' | 'error' | 'warning' | 'information';
    code: string;
    diagnostics?: string;
    expression?: string[];
  }>;
}

/**
 * FHIR Error class
 */
export class FHIRError extends Error {
  outcome?: OperationOutcome;
  status?: number;
  
  constructor(message: string, outcome?: OperationOutcome, status?: number) {
    super(message);
    this.name = 'FHIRError';
    this.outcome = outcome;
    this.status = status;
  }
}

/**
 * FHIR Resource Types
 */
export enum FHIRResourceType {
  Patient = 'Patient',
  Observation = 'Observation',
  Condition = 'Condition',
  MedicationRequest = 'MedicationRequest',
  DiagnosticReport = 'DiagnosticReport',
}

/**
 * FHIR Bundle Types
 */
export enum FHIRBundleType {
  Document = 'document',
  Message = 'message',
  Transaction = 'transaction',
  TransactionResponse = 'transaction-response',
  Batch = 'batch',
  BatchResponse = 'batch-response',
  History = 'history',
  SearchSet = 'searchset',
  Collection = 'collection',
} 