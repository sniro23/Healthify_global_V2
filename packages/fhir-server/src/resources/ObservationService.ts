import { createClient } from '@supabase/supabase-js';
import { FHIRObservation } from '../../models/observation';
import { BaseFHIRService } from '../base/BaseFHIRService';
import { AuditActionType } from '../../models/auditEvent';

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
      
      const { data, error } = await this.supabase
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
        AuditActionType.UPDATE, 
        'Observation',
        observation.id || ''
      );
      
      return data.id;
    } catch (error) {
      console.error('Error in saveObservation:', error);
      throw error;
    }
  }

  public async getObservationsByPatient(patientId: string): Promise<FHIRObservation[]> {
    try {
      const { data, error } = await this.supabase
        .from('observations')
        .select('fhir_resource')
        .eq('patient_id', patientId)
        .order('effective_date', { ascending: false });
      
      if (error) {
        console.error('Error fetching observations:', error);
        throw new Error(`Failed to fetch observations: ${error.message}`);
      }
      
      return data?.map(item => item.fhir_resource as FHIRObservation) || [];
    } catch (error) {
      console.error('Error in getObservationsByPatient:', error);
      throw error;
    }
  }

  public async getObservationById(id: string): Promise<FHIRObservation | null> {
    try {
      const { data, error } = await this.supabase
        .from('observations')
        .select('fhir_resource')
        .eq('fhir_id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Not found
        }
        console.error('Error fetching observation:', error);
        throw new Error(`Failed to fetch observation: ${error.message}`);
      }
      
      return data?.fhir_resource as FHIRObservation || null;
    } catch (error) {
      console.error('Error in getObservationById:', error);
      throw error;
    }
  }
} 