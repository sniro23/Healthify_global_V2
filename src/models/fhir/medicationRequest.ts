
/**
 * FHIR MedicationRequest Resource Model
 * Based on FHIR R4 specification: https://www.hl7.org/fhir/medicationrequest.html
 */

import { FHIRReference, FHIRCodeableConcept, FHIRPeriod } from "./appointment";

// FHIR Resource metadata
export interface FHIRMeta {
  versionId: string;
  lastUpdated: string;
  source?: string;
  profile?: string[];
  security?: FHIRCodeableConcept[];
  tag?: FHIRCodeableConcept[];
}

// FHIR Resource Identifier
export interface FHIRIdentifier {
  use?: 'usual' | 'official' | 'temp' | 'secondary' | 'old';
  type?: FHIRCodeableConcept;
  system?: string;
  value?: string;
  period?: FHIRPeriod;
  assigner?: FHIRReference;
}

// FHIR Extension
export interface FHIRExtension {
  url: string;
  valueString?: string;
  valueBoolean?: boolean;
  valueInteger?: number;
  valueDecimal?: number;
  valueDateTime?: string;
  valueCode?: string;
  valueReference?: FHIRReference;
}

export type MedicationRequestStatus = 
  | 'active'
  | 'on-hold'
  | 'cancelled'
  | 'completed'
  | 'entered-in-error'
  | 'stopped'
  | 'draft'
  | 'unknown';

export type MedicationRequestIntent = 
  | 'proposal'
  | 'plan'
  | 'order'
  | 'original-order'
  | 'reflex-order'
  | 'filler-order'
  | 'instance-order'
  | 'option';

export type MedicationRequestPriority = 'routine' | 'urgent' | 'asap' | 'stat';

export interface FHIRDosage {
  sequence?: number;
  text?: string;
  timing?: {
    code?: FHIRCodeableConcept;
    repeat?: {
      frequency?: number;
      period?: number;
      periodUnit?: 'h' | 'd' | 'wk' | 'mo';
    };
  };
  route?: FHIRCodeableConcept;
  doseAndRate?: {
    type?: FHIRCodeableConcept;
    doseQuantity?: {
      value: number;
      unit: string;
      system?: string;
      code?: string;
    };
  }[];
}

export interface FHIRMedicationRequest {
  resourceType: 'MedicationRequest';
  id: string;
  meta?: FHIRMeta;
  identifier?: FHIRIdentifier[];
  extension?: FHIRExtension[];
  status: MedicationRequestStatus;
  intent: MedicationRequestIntent;
  priority?: MedicationRequestPriority;
  medicationCodeableConcept?: FHIRCodeableConcept;
  medicationReference?: FHIRReference;
  subject: FHIRReference;
  requester?: FHIRReference;
  encounter?: FHIRReference;
  authoredOn?: string;
  reasonCode?: FHIRCodeableConcept[];
  note?: {
    text: string;
  }[];
  dosageInstruction?: FHIRDosage[];
  dispenseRequest?: {
    initialFill?: {
      quantity?: {
        value: number;
        unit: string;
      };
    };
    numberOfRepeatsAllowed?: number;
    quantity?: {
      value: number;
      unit: string;
    };
    expectedSupplyDuration?: {
      value: number;
      unit: string;
    };
    performer?: FHIRReference;
  };
  substitution?: {
    allowedBoolean?: boolean;
    reason?: FHIRCodeableConcept;
  };
}

export interface MedicationRequestWithContext {
  medicationRequest: FHIRMedicationRequest;
  patient: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  doctor: {
    id: string;
    name: string;
    imageUrl?: string;
  };
}

// Helper function to convert status from our model to FHIR
export const mapStatusToFHIR = (status: string): MedicationRequestStatus => {
  switch (status) {
    case 'active': return 'active';
    case 'pending': return 'on-hold';
    case 'expired': return 'completed';
    default: return 'unknown';
  }
};

// Helper to generate a proper FHIR UUID
export const generateFhirUuid = (): string => {
  return 'urn:uuid:' + crypto.randomUUID();
};

// Helper function to extract patient name
export const extractPatientName = (medicationRequest: FHIRMedicationRequest): string => {
  return medicationRequest.subject.display || 'Unknown Patient';
};
