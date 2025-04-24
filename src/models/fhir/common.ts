
/**
 * Common FHIR data models and types for interoperability
 */

/**
 * Base FHIR Resource interface
 */
export interface FHIRResource {
  resourceType: string;
  id?: string;
  meta?: FHIRMeta;
}

/**
 * FHIR Meta information
 */
export interface FHIRMeta {
  versionId?: string;
  lastUpdated?: string;
  source?: string;
  profile?: string[];
  security?: FHIRCoding[];
  tag?: FHIRCoding[];
}

/**
 * FHIR Coding data type
 */
export interface FHIRCoding {
  system?: string;
  version?: string;
  code?: string;
  display?: string;
  userSelected?: boolean;
}

/**
 * FHIR CodeableConcept data type
 */
export interface FHIRCodeableConcept {
  coding?: FHIRCoding[];
  text?: string;
}

/**
 * FHIR Quantity data type
 */
export interface FHIRQuantity {
  value?: number;
  comparator?: '<' | '<=' | '>=' | '>';
  unit?: string;
  system?: string;
  code?: string;
}

/**
 * FHIR Period data type
 */
export interface FHIRPeriod {
  start?: string; // ISO date string
  end?: string;   // ISO date string
}

/**
 * FHIR Reference data type
 */
export interface FHIRReference {
  reference?: string;
  type?: string;
  identifier?: {
    system: string;
    value: string;
  };
  display?: string;
}

/**
 * FHIR Extension
 */
export interface FHIRExtension {
  url: string;
  valueString?: string;
  valueCode?: string;
  valueInteger?: number;
  valueBoolean?: boolean;
  valueDecimal?: number;
  valueDateTime?: string;
}

/**
 * Standard Code Systems in FHIR
 */
export const FHIR_CODE_SYSTEMS = {
  SNOMED_CT: 'http://snomed.info/sct',
  LOINC: 'http://loinc.org',
  RXNORM: 'http://www.nlm.nih.gov/research/umls/rxnorm',
  ICD10: 'http://hl7.org/fhir/sid/icd-10',
  CPT: 'http://www.ama-assn.org/go/cpt'
};

/**
 * Helper function to create a proper FHIR reference string
 */
export const createFHIRReference = (
  resourceType: string,
  id: string,
  display?: string
): FHIRReference => {
  return {
    reference: `${resourceType}/${id}`,
    type: resourceType,
    display
  };
};

/**
 * Helper function to create a CodeableConcept with multiple codings
 */
export const createCodeableConcept = (
  codings: FHIRCoding[],
  text?: string
): FHIRCodeableConcept => {
  return {
    coding: codings,
    text
  };
};

/**
 * Helper function to create a SNOMED CT coding
 */
export const createSNOMEDCoding = (code: string, display: string): FHIRCoding => {
  return {
    system: FHIR_CODE_SYSTEMS.SNOMED_CT,
    code,
    display
  };
};

/**
 * Helper function to create a LOINC coding
 */
export const createLOINCCoding = (code: string, display: string): FHIRCoding => {
  return {
    system: FHIR_CODE_SYSTEMS.LOINC,
    code,
    display
  };
};

/**
 * Helper function to create an RxNorm coding
 */
export const createRxNormCoding = (code: string, display: string): FHIRCoding => {
  return {
    system: FHIR_CODE_SYSTEMS.RXNORM,
    code,
    display
  };
};
