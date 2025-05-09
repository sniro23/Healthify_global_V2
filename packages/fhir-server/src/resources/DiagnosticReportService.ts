import { BaseFHIRService } from '../base/BaseFHIRService';
import { FHIRDiagnosticReport } from '../models/diagnosticReport';
import { AuditActionType } from '../models/auditEvent';

export class DiagnosticReportService extends BaseFHIRService {
  public async saveDiagnosticReport(diagnosticReport: FHIRDiagnosticReport, userId: string): Promise<string> {
    try {
      if (!diagnosticReport.id) {
        diagnosticReport.id = crypto.randomUUID();
      }
      
      const patientId = diagnosticReport.subject.reference.split('/')[1];
      const category = diagnosticReport.category?.[0]?.coding?.[0]?.code || 'unknown';
      const code = diagnosticReport.code.coding?.[0]?.code || 
                  diagnosticReport.code.text ||
                  'unknown-code';
      
      let effectiveDate = null;
      if (diagnosticReport.effectiveDateTime) {
        effectiveDate = diagnosticReport.effectiveDateTime;
      } else if (diagnosticReport.effectivePeriod?.start) {
        effectiveDate = diagnosticReport.effectivePeriod.start;
      }
      
      const { data, error } = await this.supabase
        .from('diagnostic_reports')
        .upsert({
          fhir_id: diagnosticReport.id,
          fhir_resource: diagnosticReport as any,
          patient_id: patientId,
          category: category,
          code: code,
          status: diagnosticReport.status,
          effective_date: effectiveDate,
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
        AuditActionType.UPDATE, 
        'DiagnosticReport',
        diagnosticReport.id || ''
      );
      
      return data.id;
    } catch (error) {
      console.error('Error in saveDiagnosticReport:', error);
      throw error;
    }
  }

  public async getDiagnosticReportsByPatient(patientId: string): Promise<FHIRDiagnosticReport[]> {
    try {
      const { data, error } = await this.supabase
        .from('diagnostic_reports')
        .select('fhir_resource')
        .eq('patient_id', patientId)
        .order('effective_date', { ascending: false });
      
      if (error) {
        console.error('Error fetching diagnostic reports:', error);
        throw new Error(`Failed to fetch diagnostic reports: ${error.message}`);
      }
      
      return data?.map(item => item.fhir_resource as FHIRDiagnosticReport) || [];
    } catch (error) {
      console.error('Error in getDiagnosticReportsByPatient:', error);
      throw error;
    }
  }

  public async getDiagnosticReportById(id: string): Promise<FHIRDiagnosticReport | null> {
    try {
      const { data, error } = await this.supabase
        .from('diagnostic_reports')
        .select('fhir_resource')
        .eq('fhir_id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Not found
        }
        console.error('Error fetching diagnostic report:', error);
        throw new Error(`Failed to fetch diagnostic report: ${error.message}`);
      }
      
      return data?.fhir_resource as FHIRDiagnosticReport || null;
    } catch (error) {
      console.error('Error in getDiagnosticReportById:', error);
      throw error;
    }
  }
} 