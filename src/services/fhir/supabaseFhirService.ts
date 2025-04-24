import { supabase } from '@/integrations/supabase/client';
import { ExtendedPatient } from '@/models/fhir/extendedPatient';
import { FHIRObservation } from '@/models/fhir/observation';
import { FHIRCondition } from '@/models/fhir/condition';
import { FHIRDiagnosticReport } from '@/models/fhir/diagnosticReport';
import { AuditActionType, AuditOutcomeCode } from '@/models/fhir/auditEvent';

export class SupabaseFHIRService {
  /**
   * Save a patient resource to Supabase
   */
  public async savePatient(patient: ExtendedPatient, userId: string): Promise<string> {
    try {
      // Ensure patient has an ID
      if (!patient.id) {
        patient.id = crypto.randomUUID();
      }
      
      const { data, error } = await supabase
        .from('patients')
        .upsert({
          fhir_id: patient.id,
          fhir_resource: patient,
          user_id: userId,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error saving patient:', error);
        throw new Error(`Failed to save patient: ${error.message}`);
      }
      
      await this.logAudit(
        userId, 
        patient.id ? AuditActionType.UPDATE : AuditActionType.CREATE,
        'Patient',
        patient.id
      );
      
      return data.id;
    } catch (error) {
      console.error('Error in savePatient:', error);
      throw error;
    }
  }
  
  /**
   * Get a patient from Supabase by FHIR ID
   */
  public async getPatientByFhirId(fhirId: string): Promise<ExtendedPatient | null> {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('fhir_resource')
        .eq('fhir_id', fhirId)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') { // Not found
          return null;
        }
        throw new Error(`Failed to get patient: ${error.message}`);
      }
      
      this.logAudit('system', AuditActionType.READ, 'Patient', fhirId);
      
      return data.fhir_resource as ExtendedPatient;
    } catch (error) {
      console.error('Error in getPatientByFhirId:', error);
      throw error;
    }
  }
  
  /**
   * Save an observation to Supabase
   */
  public async saveObservation(observation: FHIRObservation, userId?: string): Promise<string> {
    try {
      // Ensure observation has an ID
      if (!observation.id) {
        observation.id = crypto.randomUUID();
      }
      
      // Get patient ID from reference (e.g., "Patient/1234")
      const patientId = observation.subject.reference.split('/')[1];
      
      // Extract categories for indexing
      const categories = observation.category?.map(cat => 
        cat.coding?.[0]?.code || cat.text || 'unknown'
      ) || ['unknown'];
      
      // Extract code for indexing
      const code = observation.code.coding?.[0]?.code || 
                  observation.code.text ||
                  'unknown-code';
      
      // Determine effective date
      let effectiveDate = null;
      if (observation.effectiveDateTime) {
        effectiveDate = observation.effectiveDateTime;
      } else if (observation.effectivePeriod?.start) {
        effectiveDate = observation.effectivePeriod.start;
      }
      
      // Insert the observation into Supabase
      const { data, error } = await supabase
        .from('observations')
        .upsert({
          fhir_id: observation.id,
          fhir_resource: observation,
          patient_id: patientId,
          category: categories,
          code: code,
          status: observation.status,
          effective_date: effectiveDate,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'fhir_id',
          ignoreDuplicates: false
        })
        .select('id')
        .single();
      
      if (error) {
        console.error('Error saving observation:', error);
        throw new Error(`Failed to save observation: ${error.message}`);
      }
      
      this.logAudit(
        userId || 'system', 
        observation.id ? AuditActionType.UPDATE : AuditActionType.CREATE,
        'Observation',
        observation.id || ''
      );
      
      return data.id;
    } catch (error) {
      console.error('Error in saveObservation:', error);
      throw error;
    }
  }
  
  /**
   * Save a condition to Supabase
   */
  public async saveCondition(condition: FHIRCondition, userId?: string): Promise<string> {
    try {
      // Ensure condition has an ID
      if (!condition.id) {
        condition.id = crypto.randomUUID();
      }
      
      // Get patient ID from reference
      const patientId = condition.subject.reference.split('/')[1];
      
      // Extract categories for indexing
      const categories = condition.category?.map(cat => 
        cat.coding?.[0]?.code || cat.text || 'unknown'
      ) || ['unknown'];
      
      // Extract code for indexing
      const code = condition.code?.coding?.[0]?.code || 
                  condition.code?.text ||
                  'unknown-code';
      
      // Extract clinical status
      const clinicalStatus = condition.clinicalStatus?.coding?.[0]?.code || 'unknown';
      
      // Extract verification status
      const verificationStatus = condition.verificationStatus?.coding?.[0]?.code || null;
      
      // Determine onset date
      let onsetDate = null;
      if (condition.onsetDateTime) {
        onsetDate = condition.onsetDateTime;
      } else if (condition.onsetPeriod?.start) {
        onsetDate = condition.onsetPeriod.start;
      } else if (condition.onsetString) {
        onsetDate = condition.recordedDate || null; // Fall back to recorded date if onset is just a string
      }
      
      // Insert the condition into Supabase
      const { data, error } = await supabase
        .from('conditions')
        .upsert({
          fhir_id: condition.id,
          fhir_resource: condition,
          patient_id: patientId,
          category: categories,
          code: code,
          clinical_status: clinicalStatus,
          verification_status: verificationStatus,
          onset_date: onsetDate,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'fhir_id',
          ignoreDuplicates: false
        })
        .select('id')
        .single();
      
      if (error) {
        console.error('Error saving condition:', error);
        throw new Error(`Failed to save condition: ${error.message}`);
      }
      
      this.logAudit(
        userId || 'system', 
        condition.id ? AuditActionType.UPDATE : AuditActionType.CREATE,
        'Condition',
        condition.id || ''
      );
      
      return data.id;
    } catch (error) {
      console.error('Error in saveCondition:', error);
      throw error;
    }
  }
  
  /**
   * Save a diagnostic report to Supabase
   */
  public async saveDiagnosticReport(report: FHIRDiagnosticReport, userId?: string): Promise<string> {
    try {
      // Ensure report has an ID
      if (!report.id) {
        report.id = crypto.randomUUID();
      }
      
      // Get patient ID from reference
      const patientId = report.subject.reference.split('/')[1];
      
      // Extract categories for indexing
      const categories = report.category?.map(cat => 
        cat.coding?.[0]?.code || cat.text || 'unknown'
      ) || ['unknown'];
      
      // Extract code for indexing
      const code = report.code.coding?.[0]?.code || 
                  report.code.text ||
                  'unknown-code';
      
      // Determine issued date
      const issuedDate = report.issued || null;
      
      // Insert the diagnostic report into Supabase
      const { data, error } = await supabase
        .from('diagnostic_reports')
        .upsert({
          fhir_id: report.id,
          fhir_resource: report,
          patient_id: patientId,
          category: categories,
          code: code,
          status: report.status,
          issued_date: issuedDate,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'fhir_id',
          ignoreDuplicates: false
        })
        .select('id')
        .single();
      
      if (error) {
        console.error('Error saving diagnostic report:', error);
        throw new Error(`Failed to save diagnostic report: ${error.message}`);
      }
      
      this.logAudit(
        userId || 'system', 
        report.id ? AuditActionType.UPDATE : AuditActionType.CREATE,
        'DiagnosticReport',
        report.id || ''
      );
      
      return data.id;
    } catch (error) {
      console.error('Error in saveDiagnosticReport:', error);
      throw error;
    }
  }
  
  /**
   * Save an audit event to Supabase
   */
  public async saveAuditEvent(event: FHIRAuditEvent): Promise<string> {
    try {
      // Extract the agent details
      const agent = event.agent[0];
      const userId = agent.who?.reference?.split('/')[1] || agent.altId || 'unknown';
      
      // Extract the entity details
      const entity = event.entity && event.entity.length > 0 ? event.entity[0] : null;
      const resourceReference = entity?.what?.reference || '';
      const [resourceType, resourceId] = resourceReference.split('/');
      
      // Extract action and outcome
      const action = event.action || 'R';
      const outcome = event.outcome || 'success';
      const outcomeDesc = event.outcomeDesc;
      
      // Extract details
      const details = {
        type: event.type,
        subtype: event.subtype,
        outcome,
        outcomeDesc,
        recorded: event.recorded,
        agent: event.agent,
        entity: event.entity
      };
      
      // Insert into audit_logs table
      const { data, error } = await supabase
        .from('audit_logs')
        .insert({
          user_id: userId,
          action,
          resource_type: resourceType || 'unknown',
          resource_id: resourceId || null,
          details
        })
        .select('id')
        .single();
      
      if (error) {
        console.error('Error saving audit event:', error);
        throw new Error(`Failed to save audit event: ${error.message}`);
      }
      
      return data.id;
    } catch (error) {
      console.error('Error in saveAuditEvent:', error);
      return 'error';
    }
  }
  
  /**
   * Helper method to log an audit entry
   */
  private async logAudit(
    userId: string,
    action: AuditActionType,
    resourceType: string,
    resourceId: string,
    outcome: AuditOutcomeCode = AuditOutcomeCode.SUCCESS,
    outcomeDesc?: string
  ): Promise<void> {
    try {
      await supabase
        .from('audit_logs')
        .insert({
          user_id: userId,
          action,
          resource_type: resourceType,
          resource_id: resourceId,
          details: {
            outcome,
            outcomeDesc,
            timestamp: new Date().toISOString()
          }
        });
    } catch (error) {
      console.error('Error logging audit:', error);
    }
  }
  
  /**
   * Check if a user has permission for a specific action on a resource type
   */
  public async hasPermission(userId: string, resourceType: string, permission: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('user_permissions')
        .select('*')
        .eq('user_id', userId)
        .eq('resource_type', resourceType)
        .eq('permission', permission)
        .maybeSingle();
      
      if (error) {
        console.error('Error checking permission:', error);
        return false;
      }
      
      return !!data;
    } catch (error) {
      console.error('Error in hasPermission:', error);
      return false;
    }
  }
}

// Export a singleton instance
export const fhirService = new SupabaseFHIRService();
