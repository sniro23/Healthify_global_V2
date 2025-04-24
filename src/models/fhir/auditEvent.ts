
import { FHIRResource } from './common';

/**
 * FHIR AuditEvent resource
 * Used for tracking data access and security events
 */
export interface FHIRAuditEvent extends FHIRResource {
  resourceType: 'AuditEvent';
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
    profile?: string[];
  };
  type: {
    system: string;
    code: string;
    display?: string;
  };
  subtype?: Array<{
    system: string;
    code: string;
    display?: string;
  }>;
  action?: 'C' | 'R' | 'U' | 'D' | 'E';
  period?: {
    start: string;
    end?: string;
  };
  recorded: string;
  outcome?: 'success' | 'minor' | 'serious' | 'major' | 'fatal';
  outcomeDesc?: string;
  purposeOfEvent?: Array<{
    system: string;
    code: string;
    display?: string;
  }>;
  agent: Array<{
    type?: {
      coding?: Array<{
        system: string;
        code: string;
        display?: string;
      }>;
      text?: string;
    };
    role?: Array<{
      coding?: Array<{
        system: string;
        code: string;
        display?: string;
      }>;
      text?: string;
    }>;
    who?: {
      reference?: string;
      display?: string;
    };
    altId?: string;
    name?: string;
    requestor: boolean;
    location?: {
      reference: string;
      display?: string;
    };
    policy?: string[];
    network?: {
      address?: string;
      type?: '1' | '2' | '3' | '4' | '5';
    };
    purpose?: Array<{
      system: string;
      code: string;
      display?: string;
    }>;
  }>;
  source: {
    site?: string;
    observer: {
      reference: string;
      display?: string;
    };
    type?: Array<{
      system: string;
      code: string;
      display?: string;
    }>;
  };
  entity?: Array<{
    what?: {
      reference?: string;
      display?: string;
    };
    type?: {
      system: string;
      code: string;
      display?: string;
    };
    role?: {
      system: string;
      code: string;
      display?: string;
    };
    lifecycle?: {
      system: string;
      code: string;
      display?: string;
    };
    securityLabel?: Array<{
      system: string;
      code: string;
      display?: string;
    }>;
    name?: string;
    description?: string;
    query?: string;
    detail?: Array<{
      type: string;
      value: string;
    }>;
  }>;
}

/**
 * Access type enum for audit events
 */
export enum AuditActionType {
  CREATE = 'C',
  READ = 'R',
  UPDATE = 'U',
  DELETE = 'D',
  EXECUTE = 'E'
}

/**
 * Audit outcome code enum
 */
export enum AuditOutcomeCode {
  SUCCESS = 'success',
  MINOR = 'minor',
  SERIOUS = 'serious',
  MAJOR = 'major',
  FATAL = 'fatal'
}

/**
 * Create an audit event for resource access
 */
export function createResourceAccessAuditEvent(
  resourceType: string,
  resourceId: string | undefined,
  action: AuditActionType,
  userId: string,
  userName: string,
  outcome: AuditOutcomeCode = AuditOutcomeCode.SUCCESS,
  outcomeDesc?: string
): FHIRAuditEvent {
  return {
    resourceType: 'AuditEvent',
    type: {
      system: 'http://terminology.hl7.org/CodeSystem/audit-event-type',
      code: 'rest',
      display: 'RESTful Operation'
    },
    subtype: [{
      system: 'http://hl7.org/fhir/restful-interaction',
      code: getSubtypeCodeFromAction(action),
      display: getSubtypeDisplayFromAction(action)
    }],
    action: action,
    recorded: new Date().toISOString(),
    outcome: outcome,
    outcomeDesc: outcomeDesc,
    agent: [{
      type: {
        coding: [{
          system: 'http://dicom.nema.org/resources/ontology/DCM',
          code: '110153',
          display: 'Source Role ID'
        }]
      },
      who: {
        reference: `Person/${userId}`,
        display: userName
      },
      requestor: true
    }],
    source: {
      observer: {
        reference: 'Device/healthify-app',
        display: 'Healthify Application'
      },
      type: [{
        system: 'http://terminology.hl7.org/CodeSystem/security-source-type',
        code: '4',
        display: 'Application Server'
      }]
    },
    entity: [{
      what: resourceId ? {
        reference: `${resourceType}/${resourceId}`
      } : undefined,
      type: {
        system: 'http://terminology.hl7.org/CodeSystem/audit-entity-type',
        code: '2',
        display: 'System Object'
      },
      role: {
        system: 'http://terminology.hl7.org/CodeSystem/object-role',
        code: '4',
        display: 'Domain Resource'
      },
      description: `${resourceType} resource`
    }]
  };
}

/**
 * Get the subtype code for a REST action
 */
function getSubtypeCodeFromAction(action: AuditActionType): string {
  switch (action) {
    case AuditActionType.CREATE:
      return 'create';
    case AuditActionType.READ:
      return 'read';
    case AuditActionType.UPDATE:
      return 'update';
    case AuditActionType.DELETE:
      return 'delete';
    case AuditActionType.EXECUTE:
      return 'operation';
    default:
      return 'search';
  }
}

/**
 * Get the subtype display for a REST action
 */
function getSubtypeDisplayFromAction(action: AuditActionType): string {
  switch (action) {
    case AuditActionType.CREATE:
      return 'Create';
    case AuditActionType.READ:
      return 'Read';
    case AuditActionType.UPDATE:
      return 'Update';
    case AuditActionType.DELETE:
      return 'Delete';
    case AuditActionType.EXECUTE:
      return 'Operation';
    default:
      return 'Search';
  }
}
