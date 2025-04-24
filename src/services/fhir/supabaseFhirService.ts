
import { ExtendedPatient } from '@/models/fhir/extendedPatient';
import { FHIRObservation } from '@/models/fhir/observation';
import { FHIRCondition } from '@/models/fhir/condition';
import { FHIRDiagnosticReport } from '@/models/fhir/diagnosticReport';
import { fhirServiceFactory } from './FHIRServiceFactory';

export class SupabaseFHIRService {
  public async savePatient(patient: ExtendedPatient, userId: string): Promise<string> {
    return fhirServiceFactory.getPatientService().savePatient(patient, userId);
  }
  
  public async getPatientByFhirId(fhirId: string): Promise<ExtendedPatient | null> {
    return fhirServiceFactory.getPatientService().getPatientByFhirId(fhirId);
  }
  
  public async saveObservation(observation: FHIRObservation, userId: string): Promise<string> {
    return fhirServiceFactory.getObservationService().saveObservation(observation, userId);
  }
  
  public async saveCondition(condition: FHIRCondition, userId: string): Promise<string> {
    return fhirServiceFactory.getConditionService().saveCondition(condition, userId);
  }
  
  public async saveDiagnosticReport(report: FHIRDiagnosticReport, userId: string): Promise<string> {
    return fhirServiceFactory.getDiagnosticReportService().saveDiagnosticReport(report, userId);
  }
}

// Export singleton instance
export const fhirService = new SupabaseFHIRService();
