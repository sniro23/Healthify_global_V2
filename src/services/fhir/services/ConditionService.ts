
import { supabase } from '@/integrations/supabase/client';
import { FHIRCondition } from '@/models/fhir/condition';
import { BaseFHIRService } from '../base/BaseFHIRService';
import { AuditActionType } from '@/models/fhir/auditEvent';

export class ConditionService extends BaseFHIRService {
  public async saveCondition(condition: FHIRCondition, userId: string): Promise<string> {
    try {
      if (!condition.id) {
        condition.id = crypto.randomUUID();
      }
      
      const patientId = condition.subject.reference.split('/')[1];
      const categories = condition.category?.map(cat => 
        cat.coding?.[0]?.code || cat.text || 'unknown'
      ) || ['unknown'];
      
      const code = condition.code?.coding?.[0]?.code || 
                  condition.code?.text ||
                  'unknown-code';
      
      const clinicalStatus = condition.clinicalStatus?.coding?.[0]?.code || 'unknown';
      const verificationStatus = condition.verificationStatus?.coding?.[0]?.code || null;
      
      let onsetDate = null;
      if (condition.onsetDateTime) {
        onsetDate = condition.onsetDateTime;
      } else if (condition.onsetPeriod?.start) {
        onsetDate = condition.onsetPeriod.start;
      }
      
      const { data, error } = await supabase
        .from('conditions')
        .upsert({
          fhir_id: condition.id,
          fhir_resource: condition as any,
          patient_id: patientId,
          category: categories,
          code: code,
          clinical_status: clinicalStatus,
          verification_status: verificationStatus,
          onset_date: onsetDate,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error saving condition:', error);
        throw new Error(`Failed to save condition: ${error.message}`);
      }
      
      await this.logAudit(
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
}
