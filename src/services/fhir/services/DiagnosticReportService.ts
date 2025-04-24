
import { supabase } from '@/integrations/supabase/client';
import { FHIRDiagnosticReport } from '@/models/fhir/diagnosticReport';
import { BaseFHIRService } from '../base/BaseFHIRService';
import { AuditActionType } from '@/models/fhir/auditEvent';

export class DiagnosticReportService extends BaseFHIRService {
  public async saveDiagnosticReport(report: FHIRDiagnosticReport, userId: string): Promise<string> {
    try {
      if (!report.id) {
        report.id = crypto.randomUUID();
      }
      
      const patientId = report.subject.reference.split('/')[1];
      const categories = report.category?.map(cat => 
        cat.coding?.[0]?.code || cat.text || 'unknown'
      ) || ['unknown'];
      
      const code = report.code.coding?.[0]?.code || 
                  report.code.text ||
                  'unknown-code';
      
      const { data, error } = await supabase
        .from('diagnostic_reports')
        .upsert({
          fhir_id: report.id,
          fhir_resource: report as any,
          patient_id: patientId,
          category: categories,
          code: code,
          status: report.status,
          issued_date: report.issued,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error saving diagnostic report:', error);
        throw new Error(`Failed to save diagnostic report: ${error.message}`);
      }
      
      await this.logAudit(
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
}
