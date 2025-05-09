/**
 * Base interface for all FHIR resources
 */
export interface FHIRResource {
    resourceType: string;
    id?: string;
    meta?: {
        versionId?: string;
        lastUpdated?: string;
        source?: string;
        profile?: string[];
        security?: Array<{
            system?: string;
            code?: string;
            display?: string;
        }>;
        tag?: Array<{
            system?: string;
            code?: string;
            display?: string;
        }>;
    };
    language?: string;
    text?: {
        status: 'generated' | 'extensions' | 'additional' | 'empty';
        div: string;
    };
    extension?: Array<{
        url: string;
        valueString?: string;
        valueInteger?: number;
        valueBoolean?: boolean;
        valueCodeableConcept?: CodeableConcept;
        valueReference?: Reference;
        valueDateTime?: string;
    }>;
}
/**
 * FHIR CodeableConcept type
 */
export interface CodeableConcept {
    coding?: Array<{
        system?: string;
        version?: string;
        code?: string;
        display?: string;
        userSelected?: boolean;
    }>;
    text?: string;
}
/**
 * FHIR Reference type
 */
export interface Reference {
    reference: string;
    type?: string;
    identifier?: {
        system?: string;
        value?: string;
    };
    display?: string;
}
/**
 * FHIR Period type
 */
export interface Period {
    start?: string;
    end?: string;
}
/**
 * FHIR Quantity type
 */
export interface Quantity {
    value?: number;
    comparator?: '<' | '<=' | '>=' | '>';
    unit?: string;
    system?: string;
    code?: string;
}
/**
 * FHIR Address type
 */
export interface Address {
    use?: 'home' | 'work' | 'temp' | 'old' | 'billing';
    type?: 'postal' | 'physical' | 'both';
    text?: string;
    line?: string[];
    city?: string;
    district?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    period?: Period;
}
/**
 * FHIR ContactPoint type
 */
export interface ContactPoint {
    system?: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
    value?: string;
    use?: 'home' | 'work' | 'temp' | 'old' | 'mobile';
    rank?: number;
    period?: Period;
}
/**
 * FHIR HumanName type
 */
export interface HumanName {
    use?: 'usual' | 'official' | 'temp' | 'nickname' | 'anonymous' | 'old' | 'maiden';
    text?: string;
    family?: string;
    given?: string[];
    prefix?: string[];
    suffix?: string[];
    period?: Period;
}
//# sourceMappingURL=common.d.ts.map