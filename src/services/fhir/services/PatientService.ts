
import { supabase } from '@/integrations/supabase/client';
import { ExtendedPatient } from '@/models/fhir/extendedPatient';
import { BaseFHIRService } from '../base/BaseFHIRService';
import { AuditActionType } from '@/models/fhir/auditEvent';

export class PatientService extends BaseFHIRService {
  public async savePatient(patient: ExtendedPatient, userId: string): Promise<string> {
    try {
      if (!patient.id) {
        patient.id = crypto.randomUUID();
      }
      
      const { data, error } = await supabase
        .from('patients')
        .upsert({
          fhir_id: patient.id,
          fhir_resource: patient as any,
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

  public async getPatientByFhirId(fhirId: string): Promise<ExtendedPatient | null> {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('fhir_resource')
        .eq('fhir_id', fhirId)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        throw new Error(`Failed to get patient: ${error.message}`);
      }
      
      this.logAudit('system', AuditActionType.READ, 'Patient', fhirId);
      
      // Cast the data to ExtendedPatient with proper type safety
      const patientResource = data.fhir_resource as unknown;
      if (typeof patientResource === 'object' && patientResource !== null &&
          'resourceType' in patientResource && patientResource.resourceType === 'Patient') {
        return patientResource as ExtendedPatient;
      }
      
      return null;
    } catch (error) {
      console.error('Error in getPatientByFhirId:', error);
      throw error;
    }
  }
}
