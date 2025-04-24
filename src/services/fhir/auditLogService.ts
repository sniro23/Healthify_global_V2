
/**
 * FHIR Audit Log Service
 * 
 * Records all data access and modifications to FHIR resources
 * using the FHIR AuditEvent resource.
 */

import { useMutation } from '@tanstack/react-query';
import { FHIRResource } from '@/models/fhir/common';
import { smartClient } from '../auth/smartAuthService';

/**
 * FHIR AuditEvent resource
 */
export interface FHIRAuditEvent {
  resourceType: 'AuditEvent';
  id?: string;
  type: {
    system: string;
    code: string;
    display: string;
  };
  subtype?: Array<{
    system: string;
    code: string;
    display: string;
  }>;
  action: 'C' | 'R' | 'U' | 'D' | 'E';
  recorded: string;
  outcome?: {
    code: '0' | '4' | '8' | '12';
    detail?: string;
  };
  agent: Array<{
    type?: {
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
    };
    who?: {
      reference?: string;
      identifier?: {
        system: string;
        value: string;
      };
      display?: string;
    };
    altId?: string;
    name?: string;
    requestor: boolean;
    network?: {
      address?: string;
      type?: string;
    };
  }>;
  source: {
    observer: {
      reference?: string;
      identifier?: {
        system: string;
        value: string;
      };
      display?: string;
    };
    type?: Array<{
      system: string;
      code: string;
      display: string;
    }>;
  };
  entity?: Array<{
    what?: {
      reference?: string;
      identifier?: {
        system: string;
        value: string;
      };
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
    detail?: Array<{
      type: string;
      valueString?: string;
      valueBase64Binary?: string;
    }>;
  }>;
}

/**
 * Audit event action types
 */
export enum AuditActionType {
  CREATE = 'C',
  READ = 'R',
  UPDATE = 'U',
  DELETE = 'D',
  EXECUTE = 'E'
}

/**
 * Audit event outcome codes
 */
export enum AuditOutcomeCode {
  SUCCESS = '0',
  MINOR = '4',
  SERIOUS = '8',
  MAJOR = '12'
}

/**
 * Create a FHIR AuditEvent for resource access
 */
export const createAccessAuditEvent = async (
  resourceType: string,
  resourceId: string,
  action: AuditActionType,
  outcome: AuditOutcomeCode = AuditOutcomeCode.SUCCESS,
  outcomeDetail?: string
): Promise<FHIRAuditEvent> => {
  const authContext = smartClient.getAuthContext();
  const userId = authContext.subject || 'anonymous';
  const userDisplay = authContext.subject || 'Anonymous User';
  
  const auditEvent: FHIRAuditEvent = {
    resourceType: 'AuditEvent',
    type: {
      system: 'http://terminology.hl7.org/CodeSystem/audit-event-type',
      code: 'rest',
      display: 'RESTful Operation'
    },
    subtype: [
      {
        system: 'http://hl7.org/fhir/restful-interaction',
        code: actionToInteraction(action),
        display: actionToDisplay(action)
      }
    ],
    action,
    recorded: new Date().toISOString(),
    outcome: {
      code: outcome,
      detail: outcomeDetail
    },
    agent: [
      {
        type: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v3-ParticipationType',
              code: 'AUT',
              display: 'author'
            }
          ]
        },
        who: {
          identifier: {
            system: 'http://healthify.org/fhir/users',
            value: userId
          },
          display: userDisplay
        },
        requestor: true,
        network: {
          address: window.location.hostname,
          type: '2' // 2 = IP Address
        }
      }
    ],
    source: {
      observer: {
        identifier: {
          system: 'http://healthify.org/fhir/application',
          value: 'healthify-portal'
        },
        display: 'Healthify Portal'
      },
      type: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/security-source-type',
          code: '3',
          display: 'Web Server'
        }
      ]
    },
    entity: [
      {
        what: {
          reference: `${resourceType}/${resourceId}`
        },
        type: {
          system: 'http://terminology.hl7.org/CodeSystem/audit-entity-type',
          code: '1',
          display: 'Person'
        },
        role: {
          system: 'http://terminology.hl7.org/CodeSystem/object-role',
          code: '4',
          display: 'Domain Resource'
        }
      }
    ]
  };
  
  // In a real implementation, this would save the audit event to the server
  console.log('[MOCK] Creating audit event:', auditEvent);
  
  return auditEvent;
};

/**
 * Create an AuditEvent for FHIR operation execution
 */
export const createOperationAuditEvent = async (
  resourceType: string,
  resourceId: string | undefined,
  operation: string,
  outcome: AuditOutcomeCode = AuditOutcomeCode.SUCCESS,
  outcomeDetail?: string
): Promise<FHIRAuditEvent> => {
  const authContext = smartClient.getAuthContext();
  const userId = authContext.subject || 'anonymous';
  const userDisplay = authContext.subject || 'Anonymous User';
  
  const auditEvent: FHIRAuditEvent = {
    resourceType: 'AuditEvent',
    type: {
      system: 'http://terminology.hl7.org/CodeSystem/audit-event-type',
      code: 'rest',
      display: 'RESTful Operation'
    },
    subtype: [
      {
        system: 'http://hl7.org/fhir/restful-interaction',
        code: 'operation',
        display: 'Operation'
      }
    ],
    action: AuditActionType.EXECUTE,
    recorded: new Date().toISOString(),
    outcome: {
      code: outcome,
      detail: outcomeDetail
    },
    agent: [
      {
        type: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v3-ParticipationType',
              code: 'AUT',
              display: 'author'
            }
          ]
        },
        who: {
          identifier: {
            system: 'http://healthify.org/fhir/users',
            value: userId
          },
          display: userDisplay
        },
        requestor: true,
        network: {
          address: window.location.hostname,
          type: '2' // 2 = IP Address
        }
      }
    ],
    source: {
      observer: {
        identifier: {
          system: 'http://healthify.org/fhir/application',
          value: 'healthify-portal'
        },
        display: 'Healthify Portal'
      },
      type: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/security-source-type',
          code: '3',
          display: 'Web Server'
        }
      ]
    },
    entity: [
      {
        what: {
          reference: resourceId ? `${resourceType}/${resourceId}` : resourceType
        },
        detail: [
          {
            type: 'operation',
            valueString: operation
          }
        ]
      }
    ]
  };
  
  // In a real implementation, this would save the audit event to the server
  console.log('[MOCK] Creating operation audit event:', auditEvent);
  
  return auditEvent;
};

/**
 * Map action type to FHIR interaction
 */
const actionToInteraction = (action: AuditActionType): string => {
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
      return 'read';
  }
};

/**
 * Map action type to display name
 */
const actionToDisplay = (action: AuditActionType): string => {
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
      return 'Execute';
    default:
      return 'Read';
  }
};

/**
 * Hook for creating audit events
 */
export const useAuditLog = () => {
  // Mutation for creating access audit events
  const accessAuditMutation = useMutation({
    mutationFn: ({ 
      resourceType, 
      resourceId, 
      action,
      outcome,
      detail 
    }: {
      resourceType: string;
      resourceId: string;
      action: AuditActionType;
      outcome?: AuditOutcomeCode;
      detail?: string;
    }) => createAccessAuditEvent(
      resourceType, 
      resourceId, 
      action, 
      outcome || AuditOutcomeCode.SUCCESS,
      detail
    )
  });
  
  // Mutation for creating operation audit events
  const operationAuditMutation = useMutation({
    mutationFn: ({
      resourceType,
      resourceId,
      operation,
      outcome,
      detail
    }: {
      resourceType: string;
      resourceId?: string;
      operation: string;
      outcome?: AuditOutcomeCode;
      detail?: string;
    }) => createOperationAuditEvent(
      resourceType,
      resourceId,
      operation,
      outcome || AuditOutcomeCode.SUCCESS,
      detail
    )
  });
  
  return {
    logAccess: (
      resourceType: string,
      resourceId: string,
      action: AuditActionType,
      outcome?: AuditOutcomeCode,
      detail?: string
    ) => {
      accessAuditMutation.mutate({
        resourceType,
        resourceId,
        action,
        outcome,
        detail
      });
    },
    logOperation: (
      resourceType: string,
      operation: string,
      resourceId?: string,
      outcome?: AuditOutcomeCode,
      detail?: string
    ) => {
      operationAuditMutation.mutate({
        resourceType,
        resourceId,
        operation,
        outcome,
        detail
      });
    },
    isLogging: accessAuditMutation.isPending || operationAuditMutation.isPending
  };
};
