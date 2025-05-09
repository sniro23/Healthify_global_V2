import { FHIRResource, CodeableConcept, Reference } from './common';

/**
 * FHIR Condition resource
 * Used for tracking diagnoses, problems, and health concerns
 */
export interface FHIRCondition extends FHIRResource {
  resourceType: 'Condition';
  id?: string;
  clinicalStatus?: CodeableConcept;
  verificationStatus?: CodeableConcept;
  category?: CodeableConcept[];
  severity?: CodeableConcept;
  code: CodeableConcept;
  bodySite?: CodeableConcept[];
  subject: Reference;
  encounter?: Reference;
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
    low: {
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
    low: {
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
  recorder?: Reference;
  asserter?: Reference;
  stage?: Array<{
    summary?: CodeableConcept;
    assessment?: Reference[];
    type?: CodeableConcept;
  }>;
  evidence?: Array<{
    code?: CodeableConcept[];
    detail?: Reference[];
  }>;
  note?: Array<{
    text: string;
    time?: string;
    authorString?: string;
    authorReference?: Reference;
  }>;
}

/**
 * Helper function to get a human-readable display of the condition's status
 */
export function getConditionStatusDisplay(condition: FHIRCondition): string {
  const clinicalStatus = condition.clinicalStatus?.coding?.[0]?.code;
  const verificationStatus = condition.verificationStatus?.coding?.[0]?.code;
  
  let statusText = '';
  
  if (clinicalStatus) {
    switch (clinicalStatus) {
      case 'active':
        statusText = 'Active';
        break;
      case 'recurrence':
        statusText = 'Recurrence';
        break;
      case 'relapse':
        statusText = 'Relapse';
        break;
      case 'inactive':
        statusText = 'Inactive';
        break;
      case 'remission':
        statusText = 'Remission';
        break;
      case 'resolved':
        statusText = 'Resolved';
        break;
      default:
        statusText = clinicalStatus;
    }
  }
  
  if (verificationStatus) {
    let verificationText = '';
    switch (verificationStatus) {
      case 'unconfirmed':
        verificationText = 'Unconfirmed';
        break;
      case 'provisional':
        verificationText = 'Provisional';
        break;
      case 'differential':
        verificationText = 'Differential';
        break;
      case 'confirmed':
        verificationText = 'Confirmed';
        break;
      case 'refuted':
        verificationText = 'Refuted';
        break;
      case 'entered-in-error':
        verificationText = 'Entered in Error';
        break;
      default:
        verificationText = verificationStatus;
    }
    
    if (statusText) {
      statusText += ` (${verificationText})`;
    } else {
      statusText = verificationText;
    }
  }
  
  return statusText || 'Unknown';
} 