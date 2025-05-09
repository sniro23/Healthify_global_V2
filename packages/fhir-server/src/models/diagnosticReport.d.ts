import { FHIRResource, CodeableConcept, Reference } from './common';
/**
 * FHIR DiagnosticReport resource
 * Used for lab reports, imaging studies, and other diagnostic results
 */
export interface FHIRDiagnosticReport extends FHIRResource {
    resourceType: 'DiagnosticReport';
    id?: string;
    identifier?: Array<{
        system?: string;
        value?: string;
    }>;
    basedOn?: Reference[];
    status: 'registered' | 'partial' | 'preliminary' | 'final' | 'amended' | 'corrected' | 'appended' | 'cancelled' | 'entered-in-error' | 'unknown';
    category?: CodeableConcept[];
    code: CodeableConcept;
    subject: Reference;
    encounter?: Reference;
    effectiveDateTime?: string;
    effectivePeriod?: {
        start: string;
        end?: string;
    };
    issued?: string;
    performer?: Array<{
        actor: Reference;
        role?: CodeableConcept;
    }>;
    resultsInterpreter?: Reference[];
    specimen?: Reference[];
    result?: Reference[];
    imagingStudy?: Reference[];
    media?: Array<{
        comment?: string;
        link: Reference;
    }>;
    conclusion?: string;
    conclusionCode?: CodeableConcept[];
    presentedForm?: Array<{
        contentType: string;
        language?: string;
        data?: string;
        url?: string;
        size?: number;
        hash?: string;
        title?: string;
        creation?: string;
    }>;
}
/**
 * Helper function to get the formatted date of a diagnostic report
 */
export declare function getDiagnosticReportDate(report: FHIRDiagnosticReport): string;
/**
 * Get a formatted string for the diagnostic report status
 */
export declare function getDiagnosticReportStatusDisplay(status: string): string;
//# sourceMappingURL=diagnosticReport.d.ts.map