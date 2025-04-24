
import { FHIRResource } from './common';

/**
 * FHIR Condition resource
 * Used for diagnoses, problems, and other health concerns
 */
export interface FHIRCondition extends FHIRResource {
  resourceType: 'Condition';
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
  clinicalStatus?: {
    coding?: Array<{
      system?: string;
      code?: 'active' | 'recurrence' | 'relapse' | 'inactive' | 'remission' | 'resolved';
      display?: string;
    }>;
  };
  verificationStatus?: {
    coding?: Array<{
      system?: string;
      code?: 'unconfirmed' | 'provisional' | 'differential' | 'confirmed' | 'refuted' | 'entered-in-error';
      display?: string;
    }>;
  };
  category?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
  severity?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  bodySite?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
  subject: {
    reference: string;
    display?: string;
  };
  encounter?: {
    reference: string;
    display?: string;
  };
  onsetDateTime?: string;
  onsetAge?: {
    value: number;
    unit: string;
    system?: string;
    code?: string;
  };
  onsetPeriod?: {
    start: string;
    end?: string;
  };
  onsetRange?: {
    low?: {
      value: number;
      unit: string;
      system?: string;
      code?: string;
    };
    high?: {
      value: number;
      unit: string;
      system?: string;
      code?: string;
    };
  };
  onsetString?: string;
  abatementDateTime?: string;
  abatementAge?: {
    value: number;
    unit: string;
    system?: string;
    code?: string;
  };
  abatementPeriod?: {
    start: string;
    end?: string;
  };
  abatementRange?: {
    low?: {
      value: number;
      unit: string;
      system?: string;
      code?: string;
    };
    high?: {
      value: number;
      unit: string;
      system?: string;
      code?: string;
    };
  };
  abatementString?: string;
  recordedDate?: string;
  recorder?: {
    reference: string;
    display?: string;
  };
  asserter?: {
    reference: string;
    display?: string;
  };
  stage?: Array<{
    summary?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    };
    assessment?: Array<{
      reference: string;
      display?: string;
    }>;
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    };
  }>;
  evidence?: Array<{
    code?: Array<{
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    }>;
    detail?: Array<{
      reference: string;
      display?: string;
    }>;
  }>;
  note?: Array<{
    text: string;
    time?: string;
    authorString?: string;
    authorReference?: {
      reference: string;
      display?: string;
    };
  }>;
}

/**
 * Get a formatted display name for a condition
 */
export function getConditionDisplay(condition: FHIRCondition): string {
  // Get condition name
  const conditionName = condition.code?.text || 
                       condition.code?.coding?.[0]?.display || 
                       'Unknown Condition';
  
  // Get clinical status
  const clinicalStatus = condition.clinicalStatus?.coding?.[0]?.code || '';
  const clinicalStatusDisplay = 
    clinicalStatus === 'active' ? 'Active' :
    clinicalStatus === 'recurrence' ? 'Recurrence' :
    clinicalStatus === 'relapse' ? 'Relapse' :
    clinicalStatus === 'inactive' ? 'Inactive' :
    clinicalStatus === 'remission' ? 'In Remission' :
    clinicalStatus === 'resolved' ? 'Resolved' : '';
  
  // Get onset date if available
  let onsetDate = '';
  if (condition.onsetDateTime) {
    onsetDate = new Date(condition.onsetDateTime).toLocaleDateString();
  } else if (condition.onsetString) {
    onsetDate = condition.onsetString;
  }
  
  // Format display string
  let display = conditionName;
  if (clinicalStatusDisplay) {
    display = `${display} (${clinicalStatusDisplay})`;
  }
  if (onsetDate) {
    display = `${display} - Since ${onsetDate}`;
  }
  
  return display;
}

/**
 * Check if a condition is active
 */
export function isActiveCondition(condition: FHIRCondition): boolean {
  const clinicalStatus = condition.clinicalStatus?.coding?.[0]?.code;
  return clinicalStatus === 'active' || 
         clinicalStatus === 'recurrence' || 
         clinicalStatus === 'relapse';
}

/**
 * Get the severity of a condition as a string
 */
export function getConditionSeverity(condition: FHIRCondition): string {
  if (!condition.severity) {
    return 'Not specified';
  }
  
  return condition.severity.text || 
         condition.severity.coding?.[0]?.display || 
         'Not specified';
}
