/**
 * FHIR Capability Statement Service
 * 
 * Defines the capabilities of the FHIR server implementation,
 * including supported resources, operations, and search parameters.
 */

/**
 * FHIR Capability Statement
 */
export interface FHIRCapabilityStatement {
  resourceType: 'CapabilityStatement';
  status: 'draft' | 'active' | 'retired';
  date: string;
  kind: 'instance' | 'capability' | 'requirements';
  software?: {
    name: string;
    version?: string;
    releaseDate?: string;
  };
  implementation?: {
    description: string;
    url?: string;
  };
  fhirVersion: string;
  format: string[];
  rest?: Array<{
    mode: 'server' | 'client';
    resource?: Array<{
      type: string;
      profile?: string;
      interaction: Array<{
        code: 'read' | 'vread' | 'update' | 'patch' | 'delete' | 'history-instance' | 'history-type' | 'create' | 'search-type';
        documentation?: string;
      }>;
      searchParam?: Array<{
        name: string;
        type: 'number' | 'date' | 'string' | 'token' | 'reference' | 'composite' | 'quantity' | 'uri' | 'special';
        documentation?: string;
      }>;
      operation?: Array<{
        name: string;
        definition: string;
        documentation?: string;
      }>;
    }>;
    operation?: Array<{
      name: string;
      definition: string;
      documentation?: string;
    }>;
  }>;
}

/**
 * Generate a FHIR Capability Statement for the server
 */
export const generateCapabilityStatement = (): FHIRCapabilityStatement => {
  return {
    resourceType: 'CapabilityStatement',
    status: 'active',
    date: new Date().toISOString(),
    kind: 'instance',
    software: {
      name: 'Healthify FHIR Server',
      version: '1.0.0'
    },
    implementation: {
      description: 'Healthify FHIR Implementation'
    },
    fhirVersion: '4.0.1',
    format: ['json'],
    rest: [
      {
        mode: 'server',
        resource: [
          // Patient resource capabilities
          {
            type: 'Patient',
            profile: 'http://healthify.org/fhir/StructureDefinition/healthify-patient',
            interaction: [
              { code: 'read' },
              { code: 'update' },
              { code: 'create' },
              { code: 'search-type' }
            ],
            searchParam: [
              { name: 'name', type: 'string', documentation: 'Patient name (family or given)' },
              { name: 'identifier', type: 'token', documentation: 'Patient identifier' },
              { name: 'birthdate', type: 'date', documentation: 'Patient birth date' }
            ]
          },
          
          // MedicationRequest resource capabilities
          {
            type: 'MedicationRequest',
            profile: 'http://healthify.org/fhir/StructureDefinition/healthify-medication-request',
            interaction: [
              { code: 'read' },
              { code: 'update' },
              { code: 'create' },
              { code: 'search-type' }
            ],
            searchParam: [
              { name: 'patient', type: 'reference', documentation: 'Patient reference' },
              { name: 'status', type: 'token', documentation: 'MedicationRequest status' },
              { name: 'authoredon', type: 'date', documentation: 'Date prescription was authored' }
            ],
            operation: [
              {
                name: 'refill',
                definition: 'http://healthify.org/fhir/OperationDefinition/medication-request-refill',
                documentation: 'Operation to refill a medication request'
              }
            ]
          },
          
          // Appointment resource capabilities
          {
            type: 'Appointment',
            profile: 'http://healthify.org/fhir/StructureDefinition/healthify-appointment',
            interaction: [
              { code: 'read' },
              { code: 'update' },
              { code: 'create' },
              { code: 'search-type' }
            ],
            searchParam: [
              { name: 'patient', type: 'reference', documentation: 'Patient reference' },
              { name: 'date', type: 'date', documentation: 'Appointment date' },
              { name: 'status', type: 'token', documentation: 'Appointment status' }
            ]
          }
        ],
        operation: [
          {
            name: 'process-message',
            definition: 'http://healthify.org/fhir/OperationDefinition/process-message',
            documentation: 'Process a FHIR message'
          }
        ]
      }
    ]
  };
};

/**
 * Retrieve the FHIR Capability Statement
 */
export const getCapabilityStatement = (): Promise<FHIRCapabilityStatement> => {
  return Promise.resolve(generateCapabilityStatement());
};

/**
 * Check if a resource type is supported by the server
 */
export const isResourceTypeSupported = (resourceType: string): boolean => {
  const capabilityStatement = generateCapabilityStatement();
  const supportedResources = capabilityStatement.rest?.[0]?.resource?.map(res => res.type) || [];
  return supportedResources.includes(resourceType);
};

/**
 * Check if an operation is supported for a resource
 */
export const isOperationSupported = (
  resourceType: string,
  operationName: string
): boolean => {
  const capabilityStatement = generateCapabilityStatement();
  const resourceConfig = capabilityStatement.rest?.[0]?.resource?.find(res => res.type === resourceType);
  
  if (!resourceConfig) return false;
  
  return (resourceConfig.operation || []).some(op => op.name === operationName);
}; 