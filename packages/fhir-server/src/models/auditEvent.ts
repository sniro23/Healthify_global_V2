import { FHIRResource, Reference, CodeableConcept } from './common';

/**
 * Audit action types
 */
export enum AuditActionType {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  SEARCH = 'search',
  LOGIN = 'login',
  LOGOUT = 'logout',
  ACCESS = 'access',
  EXPORT = 'export',
  IMPORT = 'import'
}

/**
 * Audit log type
 */
export type AuditLogType = AuditActionType;

/**
 * FHIR AuditEvent resource
 * Used for tracking system activities for security and compliance
 */
export interface FHIRAuditEvent extends FHIRResource {
  resourceType: 'AuditEvent';
  id?: string;
  type: CodeableConcept;
  subtype?: CodeableConcept[];
  action?: 'C' | 'R' | 'U' | 'D' | 'E';
  period?: {
    start: string;
    end?: string;
  };
  recorded: string;
  outcome?: {
    code: '0' | '4' | '8' | '12';  // 0=success, 4=minor failure, 8=serious failure, 12=major failure
    detail?: CodeableConcept;
  };
  outcomeDesc?: string;
  purposeOfEvent?: CodeableConcept[];
  agent: Array<{
    type?: CodeableConcept;
    role?: CodeableConcept[];
    who: Reference;
    altId?: string;
    name?: string;
    requestor: boolean;
    location?: Reference;
    policy?: string[];
    network?: {
      address?: string;
      type?: string;
    };
  }>;
  source: {
    site?: string;
    observer: Reference;
    type?: CodeableConcept[];
  };
  entity?: Array<{
    what: Reference;
    type?: CodeableConcept;
    role?: CodeableConcept;
    lifecycle?: CodeableConcept;
    securityLabel?: CodeableConcept[];
    name?: string;
    description?: string;
    query?: string;
    detail?: Array<{
      type: string;
      value: string;
    }>;
  }>;
} 