
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
 * Common vital sign types
 */
export const VitalSignTypes = {
  HEART_RATE: {
    code: '8867-4',
    display: 'Heart rate',
    system: 'http://loinc.org',
    unit: 'beats/minute'
  },
  BLOOD_PRESSURE: {
    code: '85354-9',
    display: 'Blood pressure panel with all children optional',
    system: 'http://loinc.org'
  },
  SYSTOLIC_BP: {
    code: '8480-6',
    display: 'Systolic blood pressure',
    system: 'http://loinc.org',
    unit: 'mmHg'
  },
  DIASTOLIC_BP: {
    code: '8462-4',
    display: 'Diastolic blood pressure',
    system: 'http://loinc.org',
    unit: 'mmHg'
  },
  BODY_TEMPERATURE: {
    code: '8310-5',
    display: 'Body temperature',
    system: 'http://loinc.org',
    unit: '°C'
  },
  RESPIRATORY_RATE: {
    code: '9279-1',
    display: 'Respiratory rate',
    system: 'http://loinc.org',
    unit: 'breaths/minute'
  },
  OXYGEN_SATURATION: {
    code: '2708-6',
    display: 'Oxygen saturation in Arterial blood',
    system: 'http://loinc.org',
    unit: '%'
  },
  BODY_WEIGHT: {
    code: '29463-7',
    display: 'Body weight',
    system: 'http://loinc.org',
    unit: 'kg'
  },
  BODY_HEIGHT: {
    code: '8302-2',
    display: 'Body height',
    system: 'http://loinc.org',
    unit: 'cm'
  },
  BMI: {
    code: '39156-5',
    display: 'Body mass index (BMI)',
    system: 'http://loinc.org',
    unit: 'kg/m²'
  },
};

/**
 * Get formatted display value for an observation
 * @param observation The observation to format
 * @returns Formatted value string with units
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
    return new Date(observation.valueDateTime).toLocaleString();
  } else if (observation.valueCodeableConcept?.text) {
    return observation.valueCodeableConcept.text;
  } else if (observation.component && observation.component.length > 0) {
    // For BP and other multi-component observations
    return observation.component
      .map(comp => {
        if (comp.valueQuantity) {
          return `${comp.code.text || ''}: ${comp.valueQuantity.value} ${comp.valueQuantity.unit || ''}`;
        }
        return '';
      })
      .filter(Boolean)
      .join(', ');
  }
  
  return 'No value';
}

/**
 * Determine if an observation value is abnormal based on reference ranges
 */
export function isAbnormalObservation(observation: FHIRObservation): boolean {
  // Check interpretation for abnormal flags
  if (observation.interpretation && observation.interpretation.length > 0) {
    const abnormalCodes = ['A', 'AA', 'H', 'HH', 'L', 'LL'];
    for (const interp of observation.interpretation) {
      for (const coding of interp.coding || []) {
        if (abnormalCodes.includes(coding.code || '')) {
          return true;
        }
      }
    }
  }
  
  // Check value against reference ranges
  if (observation.valueQuantity && observation.referenceRange && observation.referenceRange.length > 0) {
    const value = observation.valueQuantity.value;
    if (value !== undefined) {
      for (const range of observation.referenceRange) {
        const lowValue = range.low?.value;
        const highValue = range.high?.value;
        
        if ((lowValue !== undefined && value < lowValue) || 
            (highValue !== undefined && value > highValue)) {
          return true;
        }
      }
    }
  }
  
  // Check components against reference ranges
  if (observation.component) {
    for (const component of observation.component) {
      if (component.valueQuantity && component.referenceRange && component.referenceRange.length > 0) {
        const value = component.valueQuantity.value;
        if (value !== undefined) {
          for (const range of component.referenceRange) {
            const lowValue = range.low?.value;
            const highValue = range.high?.value;
            
            if ((lowValue !== undefined && value < lowValue) || 
                (highValue !== undefined && value > highValue)) {
              return true;
            }
          }
        }
      }
    }
  }
  
  return false;
}
