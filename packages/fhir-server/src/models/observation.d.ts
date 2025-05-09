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
export declare function getFormattedObservationValue(observation: FHIRObservation): string;
/**
 * Check if an observation is abnormal based on reference ranges
 */
export declare function isAbnormalObservation(observation: FHIRObservation): boolean;
//# sourceMappingURL=observation.d.ts.map