/**
 * FHIR Bundle Processing Service
 * 
 * Handles FHIR transaction and batch bundles
 */

import { FHIRBundleType } from '../../types';

/**
 * FHIR Bundle
 */
export interface FHIRBundle {
  resourceType: 'Bundle';
  type: FHIRBundleType | string;
  entry?: Array<{
    resource?: any;
    request?: {
      method: string;
      url: string;
    };
    response?: {
      status: string;
      location?: string;
      etag?: string;
      lastModified?: string;
    };
  }>;
}

/**
 * Process a FHIR resource
 */
async function processResource(resource: any, fhirService: any): Promise<any> {
  switch (resource.resourceType) {
    case 'Patient':
      return await fhirService.savePatient(resource, 'system');
    case 'Observation':
      return await fhirService.saveObservation(resource, 'system');
    case 'Condition':
      return await fhirService.saveCondition(resource, 'system');
    case 'DiagnosticReport':
      return await fhirService.saveDiagnosticReport(resource, 'system');
    default:
      throw new Error(`Unsupported resource type: ${resource.resourceType}`);
  }
}

/**
 * Process a FHIR transaction bundle
 */
export async function processTransactionBundle(bundle: FHIRBundle, fhirService: any): Promise<FHIRBundle> {
  try {
    const results = await Promise.all(
      (bundle.entry || []).map(async (entry) => {
        const resource = entry.resource;
        if (!resource) {
          throw new Error('Bundle entry missing resource');
        }
        
        // Process the resource based on its type
        const result = await processResource(resource, fhirService);
        
        return {
          response: {
            status: '200',
            location: `${resource.resourceType}/${result.id}`,
            etag: `W/"${result.meta?.versionId || '1'}"`,
            lastModified: resource.meta?.lastUpdated || new Date().toISOString()
          }
        };
      })
    );
    
    return {
      resourceType: 'Bundle',
      type: 'transaction-response',
      entry: results
    };
  } catch (error) {
    console.error('Error processing transaction bundle:', error);
    throw error;
  }
}

/**
 * Process a FHIR batch bundle
 */
export async function processBatchBundle(bundle: FHIRBundle, fhirService: any): Promise<FHIRBundle> {
  try {
    const results = await Promise.all(
      (bundle.entry || []).map(async (entry) => {
        const resource = entry.resource;
        if (!resource) {
          throw new Error('Bundle entry missing resource');
        }
        
        // Process the resource based on its type
        const result = await processResource(resource, fhirService);
        
        return {
          response: {
            status: '200',
            location: `${resource.resourceType}/${result.id}`,
            etag: `W/"${result.meta?.versionId || '1'}"`,
            lastModified: result.meta?.lastUpdated || new Date().toISOString()
          }
        };
      })
    );
    
    return {
      resourceType: 'Bundle',
      type: 'batch-response',
      entry: results
    };
  } catch (error) {
    console.error('Error processing batch bundle:', error);
    throw error;
  }
} 