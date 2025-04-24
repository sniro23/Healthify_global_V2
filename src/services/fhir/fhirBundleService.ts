
import { FHIRBundle, FHIRResource } from '@/models/fhir/common';
import { fhirService } from './supabaseFhirService';
import { ExtendedPatient } from '@/models/fhir/extendedPatient';
import { FHIRObservation } from '@/models/fhir/observation';
import { FHIRCondition } from '@/models/fhir/condition';
import { FHIRDiagnosticReport } from '@/models/fhir/diagnosticReport';

/**
 * Process a FHIR resource and save it to the database
 */
async function processResource(resource: any): Promise<any> {
  switch (resource.resourceType) {
    case 'Patient':
      return await fhirService.savePatient(resource as ExtendedPatient, 'system');
    case 'Observation':
      return await fhirService.saveObservation(resource as FHIRObservation, 'system');
    case 'Condition':
      return await fhirService.saveCondition(resource as FHIRCondition, 'system');
    case 'DiagnosticReport':
      return await fhirService.saveDiagnosticReport(resource as FHIRDiagnosticReport, 'system');
    default:
      throw new Error(`Unsupported resource type: ${resource.resourceType}`);
  }
}

/**
 * Process a FHIR transaction bundle
 */
export async function processTransactionBundle(bundle: FHIRBundle): Promise<FHIRBundle> {
  try {
    const results = await Promise.all(
      (bundle.entry || []).map(async (entry) => {
        const resource = entry.resource;
        if (!resource) {
          throw new Error('Bundle entry missing resource');
        }
        
        // Process the resource based on its type
        const result = await processResource(resource);
        
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
export async function processBatchBundle(bundle: FHIRBundle): Promise<FHIRBundle> {
  try {
    const results = await Promise.all(
      (bundle.entry || []).map(async (entry) => {
        const resource = entry.resource;
        if (!resource) {
          throw new Error('Bundle entry missing resource');
        }
        
        // Process the resource based on its type
        const result = await processResource(resource);
        
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
