
import { supabase } from '@/integrations/supabase/client';
import { FHIRObservation } from '@/models/fhir/observation';
import { BaseFHIRService } from '../base/BaseFHIRService';
import { AuditActionType } from '@/models/fhir/auditEvent';

export class ObservationService extends BaseFHIRService {
  public async saveObservation(observation: FHIRObservation, userId: string): Promise<string> {
    try {
      if (!observation.id) {
        observation.id = crypto.randomUUID();
      }
      
      const patientId = observation.subject.reference.split('/')[1];
      const categories = observation.category?.map(cat => 
        cat.coding?.[0]?.code || cat.text || 'unknown'
      ) || ['unknown'];
      
      const code = observation.code.coding?.[0]?.code || 
                  observation.code.text ||
                  'unknown-code';
      
      let effectiveDate = null;
      if (observation.effectiveDateTime) {
        effectiveDate = observation.effectiveDateTime;
      } else if (observation.effectivePeriod?.start) {
        effectiveDate = observation.effectivePeriod.start;
      }
      
      const { data, error } = await supabase
        .from('observations')
        .upsert({
          fhir_id: observation.id,
          fhir_resource: observation as any,
          patient_id: patientId,
          category: categories,
          code: code,
          status: observation.status,
          effective_date: effectiveDate,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error saving observation:', error);
        throw new Error(`Failed to save observation: ${error.message}`);
      }
      
      await this.logAudit(
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
}
