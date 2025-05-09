import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../supabase';
import { BaseFHIRService } from './BaseFHIRService';
import { AuditService } from './AuditService';
import { FHIRMedicationRequest } from '../models/medicationRequest';
import logger from '../logger';
import { FHIRError } from '../utils/errors';

export class MedicationRequestService extends BaseFHIRService {
  private auditService: AuditService;
  
  constructor() {
    super();
    this.auditService = new AuditService();
  }
  
  /**
   * Save a medication request to the database
   * @param medicationRequest The medication request to save
   * @param userId The user performing the operation
   * @returns The saved medication request
   */
  async saveMedicationRequest(
    medicationRequest: FHIRMedicationRequest, 
    userId: string
  ): Promise<FHIRMedicationRequest> {
    try {
      // Generate a new ID if one doesn't exist
      if (!medicationRequest.id) {
        medicationRequest.id = uuidv4();
      }
      
      // Extract patient ID from subject reference
      const patientId = medicationRequest.subject.reference.split('/').pop();
      if (!patientId) {
        throw new FHIRError('Invalid patient reference', 400);
      }
      
      // Extract medication code if available
      let medicationCode = null;
      if (medicationRequest.medicationCodeableConcept?.coding?.length) {
        medicationCode = medicationRequest.medicationCodeableConcept.coding[0].code;
      }
      
      // Save to database
      const { data, error } = await supabase
        .from('medication_requests')
        .upsert({
          id: medicationRequest.id,
          resource: medicationRequest,
          patient_id: patientId,
          status: medicationRequest.status,
          medication_code: medicationCode,
          authored_on: medicationRequest.authoredOn,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select();
      
      if (error) {
        logger.error('Error saving medication request', { error, medicationRequest });
        throw new FHIRError(`Failed to save medication request: ${error.message}`, 500);
      }
      
      // Log the action
      await this.auditService.logAction({
        userId,
        action: medicationRequest.id ? 'update' : 'create',
        resourceType: 'MedicationRequest',
        resourceId: medicationRequest.id,
        details: `${medicationRequest.id ? 'Updated' : 'Created'} medication request for patient ${patientId}`
      });
      
      return medicationRequest;
    } catch (error) {
      if (error instanceof FHIRError) {
        throw error;
      }
      logger.error('Unexpected error saving medication request', { error });
      throw new FHIRError('Failed to save medication request due to an unexpected error', 500);
    }
  }
  
  /**
   * Get medication requests for a specific patient
   * @param patientId The patient ID
   * @returns Array of medication requests
   */
  async getMedicationRequestsByPatient(patientId: string): Promise<FHIRMedicationRequest[]> {
    try {
      const { data, error } = await supabase
        .from('medication_requests')
        .select('resource')
        .eq('patient_id', patientId)
        .order('authored_on', { ascending: false });
      
      if (error) {
        logger.error('Error fetching medication requests', { error, patientId });
        throw new FHIRError(`Failed to fetch medication requests: ${error.message}`, 500);
      }
      
      return data?.map(row => row.resource as FHIRMedicationRequest) || [];
    } catch (error) {
      if (error instanceof FHIRError) {
        throw error;
      }
      logger.error('Unexpected error fetching medication requests', { error });
      throw new FHIRError('Failed to fetch medication requests due to an unexpected error', 500);
    }
  }
  
  /**
   * Get a specific medication request by ID
   * @param id The FHIR ID of the medication request
   * @returns The medication request or null if not found
   */
  async getMedicationRequestById(id: string): Promise<FHIRMedicationRequest | null> {
    try {
      const { data, error } = await supabase
        .from('medication_requests')
        .select('resource')
        .eq('id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return null;
        }
        
        logger.error('Error fetching medication request by ID', { error, id });
        throw new FHIRError(`Failed to fetch medication request: ${error.message}`, 500);
      }
      
      return data.resource as FHIRMedicationRequest;
    } catch (error) {
      if (error instanceof FHIRError) {
        throw error;
      }
      logger.error('Unexpected error fetching medication request', { error });
      throw new FHIRError('Failed to fetch medication request due to an unexpected error', 500);
    }
  }
} 