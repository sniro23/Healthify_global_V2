import { CodeableConcept, FHIRResource, Reference } from './common';

export interface FHIRMedicationRequest extends FHIRResource {
  resourceType: 'MedicationRequest';
  id?: string;
  status: 'active' | 'on-hold' | 'cancelled' | 'completed' | 'entered-in-error' | 'stopped' | 'draft' | 'unknown';
  intent: 'proposal' | 'plan' | 'order' | 'original-order' | 'reflex-order' | 'filler-order' | 'instance-order' | 'option';
  authoredOn: string;
  medicationCodeableConcept?: CodeableConcept;
  medicationReference?: Reference;
  subject: Reference;
  encounter?: Reference;
  requester?: Reference;
  recorder?: Reference;
  reasonCode?: CodeableConcept[];
  reasonReference?: Reference[];
  note?: Array<{
    text: string;
    time?: string;
    authorString?: string;
  }>;
  dosageInstruction?: Array<{
    text?: string;
    timing?: {
      repeat?: {
        frequency?: number;
        period?: number;
        periodUnit?: 'h' | 'd' | 'wk' | 'mo';
      };
      code?: CodeableConcept;
    };
    doseAndRate?: Array<{
      doseQuantity?: {
        value?: number;
        unit?: string;
        system?: string;
        code?: string;
      };
    }>;
  }>;
  dispenseRequest?: {
    validityPeriod?: {
      start?: string;
      end?: string;
    };
    numberOfRepeatsAllowed?: number;
    quantity?: {
      value?: number;
      unit?: string;
      system?: string;
      code?: string;
    };
    expectedSupplyDuration?: {
      value?: number;
      unit?: string;
      system?: string;
      code?: string;
    };
  };
  substitution?: {
    allowedBoolean?: boolean;
    allowedCodeableConcept?: CodeableConcept;
    reason?: CodeableConcept;
  };
  priorPrescription?: Reference;
  detectedIssue?: Reference[];
  eventHistory?: Reference[];
  category?: CodeableConcept[];
  priority?: 'routine' | 'urgent' | 'asap' | 'stat';
  reportedBoolean?: boolean;
  reportedReference?: Reference;
  identifier?: {
    system?: string;
    value?: string;
  }[];
}

export function getMedicationRequestDisplayName(medicationRequest: FHIRMedicationRequest): string {
  if (medicationRequest.medicationCodeableConcept) {
    return medicationRequest.medicationCodeableConcept.text || 
           medicationRequest.medicationCodeableConcept.coding?.[0]?.display || 
           'Unnamed Medication';
  }
  
  if (medicationRequest.medicationReference) {
    return medicationRequest.medicationReference.display || 
           medicationRequest.medicationReference.reference.split('/').pop() || 
           'Unnamed Medication';
  }
  
  return 'Unnamed Medication';
}

export function getMedicationRequestStatusDisplay(status: FHIRMedicationRequest['status']): string {
  const statusMap: Record<FHIRMedicationRequest['status'], string> = {
    'active': 'Active',
    'on-hold': 'On Hold',
    'cancelled': 'Cancelled',
    'completed': 'Completed',
    'entered-in-error': 'Error',
    'stopped': 'Stopped',
    'draft': 'Draft',
    'unknown': 'Unknown'
  };
  
  return statusMap[status] || 'Unknown';
} 