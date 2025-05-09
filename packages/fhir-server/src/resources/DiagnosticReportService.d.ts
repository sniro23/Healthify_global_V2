import { BaseFHIRService } from '../base/BaseFHIRService';
import { FHIRDiagnosticReport } from '../models/diagnosticReport';
export declare class DiagnosticReportService extends BaseFHIRService {
    saveDiagnosticReport(diagnosticReport: FHIRDiagnosticReport, userId: string): Promise<string>;
    getDiagnosticReportsByPatient(patientId: string): Promise<FHIRDiagnosticReport[]>;
    getDiagnosticReportById(id: string): Promise<FHIRDiagnosticReport | null>;
}
//# sourceMappingURL=DiagnosticReportService.d.ts.map