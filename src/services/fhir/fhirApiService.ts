
/**
 * FHIR API Service
 * 
 * This service provides a unified interface for working with FHIR resources
 * following RESTful CRUD operations and FHIR search parameters.
 */

// Base URL for FHIR server
const FHIR_BASE_URL = "http://localhost:8000/fhir"; // Placeholder URL

/**
 * Generic type for FHIR resources
 */
interface FHIRResource {
  resourceType: string;
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
  };
}

/**
 * FHIR Operation Outcome for error handling
 */
interface FHIROperationOutcome {
  resourceType: "OperationOutcome";
  issue: Array<{
    severity: "fatal" | "error" | "warning" | "information";
    code: string;
    diagnostics?: string;
    details?: {
      text: string;
    };
  }>;
}

/**
 * FHIR Search Parameters interface
 */
interface FHIRSearchParams {
  [key: string]: string | string[] | number | boolean | undefined;
}

/**
 * Convert search parameters to URL query string
 * 
 * @param params Search parameters object
 * @returns URL query string
 */
const buildQueryString = (params: FHIRSearchParams): string => {
  if (!params || Object.keys(params).length === 0) return "";
  
  const queryParts: string[] = [];
  
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    
    if (Array.isArray(value)) {
      value.forEach(item => {
        queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`);
      });
    } else {
      queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  }
  
  return queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
};

/**
 * Generic function to search for FHIR resources
 * 
 * @param resourceType The type of FHIR resource to search for
 * @param params Search parameters
 * @returns Promise with search results
 */
export const searchFHIRResources = async <T extends FHIRResource>(
  resourceType: string,
  params?: FHIRSearchParams
): Promise<T[]> => {
  const url = `${FHIR_BASE_URL}/${resourceType}${buildQueryString(params || {})}`;
  
  try {
    // In a real application, this would be a fetch call to the FHIR server
    // For now, we'll return mock data
    return mockFHIRResponseForSearching(resourceType, params) as T[];
  } catch (error) {
    console.error(`Error searching ${resourceType} resources:`, error);
    throw error;
  }
};

/**
 * Read a specific FHIR resource by ID
 * 
 * @param resourceType The type of FHIR resource
 * @param id The ID of the resource
 * @returns Promise with the resource
 */
export const readFHIRResource = async <T extends FHIRResource>(
  resourceType: string,
  id: string
): Promise<T> => {
  const url = `${FHIR_BASE_URL}/${resourceType}/${id}`;
  
  try {
    // In a real application, this would be a fetch call to the FHIR server
    // For now, we'll return mock data
    return mockFHIRResponseForReading(resourceType, id) as T;
  } catch (error) {
    console.error(`Error reading ${resourceType}/${id}:`, error);
    throw error;
  }
};

/**
 * Create a new FHIR resource
 * 
 * @param resource The resource to create
 * @returns Promise with the created resource
 */
export const createFHIRResource = async <T extends FHIRResource>(
  resource: T
): Promise<T> => {
  const url = `${FHIR_BASE_URL}/${resource.resourceType}`;
  
  try {
    // In a real application, this would be a fetch call to the FHIR server
    // For now, we'll return mock data
    return mockFHIRResponseForCreating(resource);
  } catch (error) {
    console.error(`Error creating ${resource.resourceType}:`, error);
    throw error;
  }
};

/**
 * Update an existing FHIR resource
 * 
 * @param resource The resource to update (must include ID)
 * @returns Promise with the updated resource
 */
export const updateFHIRResource = async <T extends FHIRResource>(
  resource: T
): Promise<T> => {
  if (!resource.id) {
    throw new Error("Resource ID is required for updates");
  }
  
  const url = `${FHIR_BASE_URL}/${resource.resourceType}/${resource.id}`;
  
  try {
    // In a real application, this would be a fetch call to the FHIR server
    // For now, we'll return mock data
    return mockFHIRResponseForUpdating(resource);
  } catch (error) {
    console.error(`Error updating ${resource.resourceType}/${resource.id}:`, error);
    throw error;
  }
};

/**
 * Delete a FHIR resource
 * 
 * @param resourceType The type of FHIR resource
 * @param id The ID of the resource to delete
 * @returns Promise that resolves when deletion is complete
 */
export const deleteFHIRResource = async (
  resourceType: string,
  id: string
): Promise<void> => {
  const url = `${FHIR_BASE_URL}/${resourceType}/${id}`;
  
  try {
    // In a real application, this would be a fetch call to the FHIR server
    console.log(`[MOCK] Deleted ${resourceType}/${id}`);
    return Promise.resolve();
  } catch (error) {
    console.error(`Error deleting ${resourceType}/${id}:`, error);
    throw error;
  }
};

/**
 * Execute a FHIR operation
 * 
 * @param resourceType The type of FHIR resource
 * @param id Optional resource ID (for instance-level operations)
 * @param operation The operation name (e.g., "$everything")
 * @param parameters Optional operation parameters
 * @returns Promise with operation result
 */
export const executeFHIROperation = async <T>(
  resourceType: string,
  operation: string,
  id?: string,
  parameters?: any
): Promise<T> => {
  const path = id 
    ? `${FHIR_BASE_URL}/${resourceType}/${id}/${operation}`
    : `${FHIR_BASE_URL}/${resourceType}/${operation}`;
  
  try {
    // In a real application, this would be a fetch call to the FHIR server
    // For now, we'll return mock data
    return mockFHIROperationResponse(resourceType, operation, id, parameters) as T;
  } catch (error) {
    console.error(`Error executing ${operation} on ${resourceType}${id ? '/' + id : ''}:`, error);
    throw error;
  }
};

/**
 * Validate a FHIR resource against profiles
 * 
 * @param resource The resource to validate
 * @returns Promise with validation results
 */
export const validateFHIRResource = async <T extends FHIRResource>(
  resource: T
): Promise<{ valid: boolean, issues?: any[] }> => {
  const url = `${FHIR_BASE_URL}/${resource.resourceType}/$validate`;
  
  try {
    // In a real application, this would be a fetch call to the FHIR server
    // For now, we'll return mock data
    return {
      valid: true,
      issues: []
    };
  } catch (error) {
    console.error(`Error validating ${resource.resourceType}:`, error);
    throw error;
  }
};

/**
 * Mock implementation for search responses
 * In a real app, this would be replaced with actual API calls
 */
const mockFHIRResponseForSearching = (resourceType: string, params?: FHIRSearchParams): any[] => {
  console.log(`[MOCK API] Searching ${resourceType} with params:`, params);
  return [];
};

/**
 * Mock implementation for read responses
 * In a real app, this would be replaced with actual API calls
 */
const mockFHIRResponseForReading = (resourceType: string, id: string): any => {
  console.log(`[MOCK API] Reading ${resourceType}/${id}`);
  return {
    resourceType,
    id,
    meta: {
      versionId: "1",
      lastUpdated: new Date().toISOString()
    }
  };
};

/**
 * Mock implementation for create responses
 * In a real app, this would be replaced with actual API calls
 */
const mockFHIRResponseForCreating = <T extends FHIRResource>(resource: T): T => {
  console.log(`[MOCK API] Creating ${resource.resourceType}`, resource);
  const now = new Date().toISOString();
  
  return {
    ...resource,
    id: resource.id || `mock-${Math.random().toString(36).substring(2, 11)}`,
    meta: {
      ...(resource.meta || {}),
      versionId: "1",
      lastUpdated: now
    }
  };
};

/**
 * Mock implementation for update responses
 * In a real app, this would be replaced with actual API calls
 */
const mockFHIRResponseForUpdating = <T extends FHIRResource>(resource: T): T => {
  console.log(`[MOCK API] Updating ${resource.resourceType}/${resource.id}`, resource);
  const now = new Date().toISOString();
  const currentVersion = parseInt(resource.meta?.versionId || "0");
  
  return {
    ...resource,
    meta: {
      ...(resource.meta || {}),
      versionId: (currentVersion + 1).toString(),
      lastUpdated: now
    }
  };
};

/**
 * Mock implementation for operation responses
 * In a real app, this would be replaced with actual API calls
 */
const mockFHIROperationResponse = (
  resourceType: string, 
  operation: string, 
  id?: string, 
  parameters?: any
): any => {
  console.log(`[MOCK API] Executing ${operation} on ${resourceType}${id ? '/' + id : ''}`, parameters);
  
  if (operation === "$everything") {
    // Return a bundle of related resources
    return {
      resourceType: "Bundle",
      type: "searchset",
      total: 1,
      entry: [
        {
          resource: {
            resourceType,
            id: id || "mock-id",
            meta: {
              versionId: "1",
              lastUpdated: new Date().toISOString()
            }
          }
        }
      ]
    };
  }
  
  if (operation === "$validate") {
    // Return validation results
    return {
      resourceType: "OperationOutcome",
      issue: [
        {
          severity: "information",
          code: "informational",
          diagnostics: "Resource validated successfully"
        }
      ]
    };
  }
  
  // Default response
  return {
    resourceType: "Parameters",
    parameter: [
      {
        name: "result",
        valueString: "Operation executed successfully"
      }
    ]
  };
};
