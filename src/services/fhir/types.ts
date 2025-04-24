
import { FHIRResource } from '@/models/fhir/common';
import { ExtendedPatient } from '@/models/fhir/extendedPatient';
import { FHIRObservation } from '@/models/fhir/observation';
import { FHIRCondition } from '@/models/fhir/condition';
import { FHIRDiagnosticReport } from '@/models/fhir/diagnosticReport';

export interface UserPermission {
  id: string;
  userId: string;
  resourceType: string;
  permission: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export type FHIRResourceType = 
  | 'Patient'
  | 'Observation'
  | 'Condition'
  | 'DiagnosticReport';

export type FHIRResourceTypeMap = {
  Patient: ExtendedPatient;
  Observation: FHIRObservation;
  Condition: FHIRCondition;
  DiagnosticReport: FHIRDiagnosticReport;
};

export type Permission = 'read' | 'write' | 'delete';

export interface FHIRErrorResponse {
  status: number;
  error: string;
  message: string;
}
