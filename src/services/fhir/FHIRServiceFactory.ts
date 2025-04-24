
import { PatientService } from './services/PatientService';
import { ObservationService } from './services/ObservationService';
import { ConditionService } from './services/ConditionService';
import { DiagnosticReportService } from './services/DiagnosticReportService';

class FHIRServiceFactory {
  private static instance: FHIRServiceFactory;
  
  private patientService: PatientService;
  private observationService: ObservationService;
  private conditionService: ConditionService;
  private diagnosticReportService: DiagnosticReportService;
  
  private constructor() {
    this.patientService = new PatientService();
    this.observationService = new ObservationService();
    this.conditionService = new ConditionService();
    this.diagnosticReportService = new DiagnosticReportService();
  }
  
  public static getInstance(): FHIRServiceFactory {
    if (!FHIRServiceFactory.instance) {
      FHIRServiceFactory.instance = new FHIRServiceFactory();
    }
    return FHIRServiceFactory.instance;
  }
  
  public getPatientService(): PatientService {
    return this.patientService;
  }
  
  public getObservationService(): ObservationService {
    return this.observationService;
  }
  
  public getConditionService(): ConditionService {
    return this.conditionService;
  }
  
  public getDiagnosticReportService(): DiagnosticReportService {
    return this.diagnosticReportService;
  }
}

export const fhirServiceFactory = FHIRServiceFactory.getInstance();
