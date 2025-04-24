
import { FHIRResource } from './common';

/**
 * FHIR DiagnosticReport resource
 * Used for lab reports, imaging studies, and other diagnostic procedures
 */
export interface FHIRDiagnosticReport extends FHIRResource {
  resourceType: 'DiagnosticReport';
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
    profile?: string[];
  };
  identifier?: Array<{
    use?: 'usual' | 'official' | 'temp' | 'secondary' | 'old';
    system?: string;
    value?: string;
  }>;
  basedOn?: Array<{
    reference: string;
    display?: string;
  }>;
  status: 'registered' | 'partial' | 'preliminary' | 'final' | 'amended' | 'corrected' | 'appended' | 'cancelled' | 'entered-in-error' | 'unknown';
  category?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
  code: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  subject: {
    reference: string;
    display?: string;
  };
  encounter?: {
    reference: string;
    display?: string;
  };
  effectiveDateTime?: string;
  effectivePeriod?: {
    start: string;
    end?: string;
  };
  issued?: string;
  performer?: Array<{
    reference: string;
    display?: string;
  }>;
  resultsInterpreter?: Array<{
    reference: string;
    display?: string;
  }>;
  specimen?: Array<{
    reference: string;
    display?: string;
  }>;
  result?: Array<{
    reference: string;
    display?: string;
  }>;
  imagingStudy?: Array<{
    reference: string;
    display?: string;
  }>;
  media?: Array<{
    comment?: string;
    link: {
      reference: string;
      display?: string;
    };
  }>;
  conclusion?: string;
  conclusionCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
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
 * Get the formatted date of a diagnostic report
 */
export function getReportDate(report: FHIRDiagnosticReport): string {
  if (report.issued) {
    return new Date(report.issued).toLocaleDateString();
  } else if (report.effectiveDateTime) {
    return new Date(report.effectiveDateTime).toLocaleDateString();
  } else if (report.effectivePeriod?.start) {
    return new Date(report.effectivePeriod.start).toLocaleDateString();
  } else {
    return 'Unknown Date';
  }
}

/**
 * Get the type/name of a diagnostic report 
 */
export function getReportType(report: FHIRDiagnosticReport): string {
  return report.code.text || 
         report.code.coding?.[0]?.display || 
         'Unknown Report Type';
}

/**
 * Get the status of a diagnostic report with proper formatting
 */
export function getFormattedReportStatus(report: FHIRDiagnosticReport): string {
  switch (report.status) {
    case 'registered':
      return 'Registered';
    case 'partial':
      return 'Partial';
    case 'preliminary':
      return 'Preliminary';
    case 'final':
      return 'Final';
    case 'amended':
      return 'Amended';
    case 'corrected':
      return 'Corrected';
    case 'appended':
      return 'Appended';
    case 'cancelled':
      return 'Cancelled';
    case 'entered-in-error':
      return 'Error';
    default:
      return 'Unknown';
  }
}
