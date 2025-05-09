import { FHIRResource } from './common';

/**
 * FHIR Observation resource
 * Used for vital signs, lab results, and other clinical measurements
 */
export interface FHIRObservation extends FHIRResource {
  resourceType: 'Observation';
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
    profile?: string[];
  };
  status: 'registered' | 'preliminary' | 'final' | 'amended' | 'corrected' | 'cancelled' | 'entered-in-error' | 'unknown';
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
  valueQuantity?: {
    value?: number;
    unit?: string;
    system?: string;
    code?: string;
  };
  valueString?: string;
  valueBoolean?: boolean;
  valueInteger?: number;
  valueDateTime?: string;
  valueCodeableConcept?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  dataAbsentReason?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  interpretation?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
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
  bodySite?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  method?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  specimen?: {
    reference: string;
    display?: string;
  };
  device?: {
    reference: string;
    display?: string;
  };
  referenceRange?: Array<{
    low?: {
      value: number;
      unit?: string;
      system?: string;
      code?: string;
    };
    high?: {
      value: number;
      unit?: string;
      system?: string;
      code?: string;
    };
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    };
    appliesTo?: Array<{
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    }>;
    age?: {
      low: {
        value: number;
        unit: string;
        system?: string;
        code?: string;
      };
      high: {
        value: number;
        unit: string;
        system?: string;
        code?: string;
      };
    };
    text?: string;
  }>;
  hasMember?: Array<{
    reference: string;
    display?: string;
  }>;
  derivedFrom?: Array<{
    reference: string;
    display?: string;
  }>;
  component?: Array<{
    code: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    };
    valueQuantity?: {
      value?: number;
      unit?: string;
      system?: string;
      code?: string;
    };
    valueString?: string;
    valueBoolean?: boolean;
    valueInteger?: number;
    valueDateTime?: string;
    valueCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    };
    dataAbsentReason?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    };
    interpretation?: Array<{
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    }>;
    referenceRange?: Array<{
      low?: {
        value: number;
        unit?: string;
        system?: string;
        code?: string;
      };
      high?: {
        value: number;
        unit?: string;
        system?: string;
        code?: string;
      };
      type?: {
        coding?: Array<{
          system?: string;
          code?: string;
          display?: string;
        }>;
        text?: string;
      };
      appliesTo?: Array<{
        coding?: Array<{
          system?: string;
          code?: string;
          display?: string;
        }>;
        text?: string;
      }>;
      age?: {
        low: {
          value: number;
          unit: string;
          system?: string;
          code?: string;
        };
        high: {
          value: number;
          unit: string;
          system?: string;
          code?: string;
        };
      };
      text?: string;
    }>;
  }>;
}

/**
 * Helper function to format observation values for display
 */
export function getFormattedObservationValue(observation: FHIRObservation): string {
  if (observation.valueQuantity) {
    return `${observation.valueQuantity.value} ${observation.valueQuantity.unit || ''}`;
  } else if (observation.valueString) {
    return observation.valueString;
  } else if (observation.valueBoolean !== undefined) {
    return observation.valueBoolean ? 'Yes' : 'No';
  } else if (observation.valueInteger !== undefined) {
    return observation.valueInteger.toString();
  } else if (observation.valueDateTime) {
    return new Date(observation.valueDateTime).toLocaleDateString();
  } else if (observation.valueCodeableConcept) {
    return observation.valueCodeableConcept.text || 
           (observation.valueCodeableConcept.coding?.[0]?.display || 
            observation.valueCodeableConcept.coding?.[0]?.code || '');
  } else if (observation.component && observation.component.length > 0) {
    // For blood pressure and other multi-component observations
    return observation.component
      .map(comp => {
        const value = comp.valueQuantity?.value || 
                     comp.valueString || 
                     comp.valueInteger || 
                     comp.valueCodeableConcept?.text || '';
        const unit = comp.valueQuantity?.unit || '';
        return `${value}${unit ? ' ' + unit : ''}`;
      })
      .join(' / ');
  }
  return 'No value';
}

/**
 * Check if an observation is abnormal based on reference ranges
 */
export function isAbnormalObservation(observation: FHIRObservation): boolean {
  // Check interpretation codes first
  if (observation.interpretation && observation.interpretation.length > 0) {
    const abnormalCodes = ['H', 'HH', 'L', 'LL', 'A', 'AA'];
    const interpretationCode = observation.interpretation[0].coding?.[0]?.code;
    if (interpretationCode && abnormalCodes.includes(interpretationCode)) {
      return true;
    }
  }

  // Check value against reference range
  if (observation.valueQuantity && observation.referenceRange && observation.referenceRange.length > 0) {
    const value = observation.valueQuantity.value;
    const range = observation.referenceRange[0];
    
    if (value !== undefined) {
      if (range.low && value < range.low.value) return true;
      if (range.high && value > range.high.value) return true;
    }
  }

  // For components (like blood pressure)
  if (observation.component && observation.component.length > 0) {
    return observation.component.some(comp => {
      if (comp.valueQuantity && comp.referenceRange && comp.referenceRange.length > 0) {
        const value = comp.valueQuantity.value;
        const range = comp.referenceRange[0];
        
        if (value !== undefined) {
          if (range.low && value < range.low.value) return true;
          if (range.high && value > range.high.value) return true;
        }
      }
      return false;
    });
  }

  return false;
} 