import { BaseFHIRService } from '../base/BaseFHIRService';
import { FHIRCondition } from '../models/condition';
import { AuditActionType } from '../models/auditEvent';

export class ConditionService extends BaseFHIRService {
  public async saveCondition(condition: FHIRCondition, userId: string): Promise<string> {
    try {
      if (!condition.id) {
        condition.id = crypto.randomUUID();
      }
      
      const patientId = condition.subject.reference.split('/')[1];
      
      const clinicalStatus = condition.clinicalStatus?.coding?.[0]?.code || 'unknown';
      const code = condition.code.coding?.[0]?.code || 
                  condition.code.text ||
                  'unknown-code';
      
      const { data, error } = await this.supabase
        .from('conditions')
        .upsert({
          fhir_id: condition.id,
          fhir_resource: condition as any,
          patient_id: patientId,
          clinical_status: clinicalStatus,
          code: code,
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
        AuditActionType.UPDATE, 
        'Condition',
        condition.id || ''
      );
      
      return data.id;
    } catch (error) {
      console.error('Error in saveCondition:', error);
      throw error;
    }
  }

  public async getConditionsByPatient(patientId: string): Promise<FHIRCondition[]> {
    try {
      const { data, error } = await this.supabase
        .from('conditions')
        .select('fhir_resource')
        .eq('patient_id', patientId)
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching conditions:', error);
        throw new Error(`Failed to fetch conditions: ${error.message}`);
      }
      
      return data?.map(item => item.fhir_resource as FHIRCondition) || [];
    } catch (error) {
      console.error('Error in getConditionsByPatient:', error);
      throw error;
    }
  }

  public async getConditionById(id: string): Promise<FHIRCondition | null> {
    try {
      const { data, error } = await this.supabase
        .from('conditions')
        .select('fhir_resource')
        .eq('fhir_id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Not found
        }
        console.error('Error fetching condition:', error);
        throw new Error(`Failed to fetch condition: ${error.message}`);
      }
      
      return data?.fhir_resource as FHIRCondition || null;
    } catch (error) {
      console.error('Error in getConditionById:', error);
      throw error;
    }
  }
} 