export interface Resource {
    resourceType: string;
    id?: string;
    meta?: {
        versionId?: string;
        lastUpdated?: string;
    };
    extension?: Extension[];
}
export interface Extension {
    url: string;
    valueString?: string;
    valueInteger?: number;
    valueBoolean?: boolean;
    valueCode?: string;
    valueDateTime?: string;
    valueQuantity?: Quantity;
    valueReference?: Reference;
}
export interface Patient extends Resource {
    resourceType: 'Patient';
    name?: HumanName[];
    gender?: string;
    birthDate?: string;
    address?: Address[];
    telecom?: ContactPoint[];
    identifier?: Identifier[];
}
export interface Condition extends Resource {
    resourceType: 'Condition';
    subject: Reference;
    code?: CodeableConcept;
    clinicalStatus?: CodeableConcept;
    verificationStatus?: CodeableConcept;
    onsetDateTime?: string;
    recordedDate?: string;
}
export interface Observation extends Resource {
    resourceType: 'Observation';
    status: string;
    category?: CodeableConcept[];
    code: CodeableConcept;
    subject: Reference;
    effectiveDateTime?: string;
    issued?: string;
    valueQuantity?: Quantity;
    valueCodeableConcept?: CodeableConcept;
    valueString?: string;
    valueBoolean?: boolean;
    valueInteger?: number;
    valueRange?: Range;
    valueRatio?: Ratio;
    valueSampledData?: SampledData;
    valueTime?: string;
    valueDateTime?: string;
    valuePeriod?: Period;
}
export interface MedicationRequest extends Resource {
    resourceType: 'MedicationRequest';
    status: string;
    intent: string;
    subject: Reference;
    medicationCodeableConcept?: CodeableConcept;
    medicationReference?: Reference;
    authoredOn?: string;
    requester?: Reference;
    reasonCode?: CodeableConcept[];
    dosageInstruction?: Array<{
        text?: string;
        timing?: Timing;
        doseAndRate?: Array<{
            type?: CodeableConcept;
            doseQuantity?: Quantity;
            rateQuantity?: Quantity;
        }>;
    }>;
}
export interface Medication extends Resource {
    resourceType: 'Medication';
    code?: CodeableConcept;
    status?: 'active' | 'inactive' | 'entered-in-error';
    manufacturer?: Reference;
    form?: CodeableConcept;
    amount?: {
        numerator?: Quantity;
        denominator?: Quantity;
    };
    ingredient?: Array<{
        itemCodeableConcept?: CodeableConcept;
        itemReference?: Reference;
        isActive?: boolean;
        strength?: {
            numerator?: Quantity;
            denominator?: Quantity;
        };
    }>;
    batch?: {
        lotNumber?: string;
        expirationDate?: string;
    };
}
export interface Reference {
    reference?: string;
    type?: string;
    display?: string;
}
export interface CodeableConcept {
    coding?: Coding[];
    text?: string;
}
export interface Coding {
    system?: string;
    version?: string;
    code?: string;
    display?: string;
    userSelected?: boolean;
}
export interface Identifier {
    use?: string;
    type?: CodeableConcept;
    system?: string;
    value?: string;
    period?: Period;
}
export interface HumanName {
    use?: string;
    text?: string;
    family?: string;
    given?: string[];
    prefix?: string[];
    suffix?: string[];
    period?: Period;
}
export interface ContactPoint {
    system?: string;
    value?: string;
    use?: string;
    rank?: string;
    period?: Period;
}
export interface Address {
    use?: string;
    type?: string;
    text?: string;
    line?: string[];
    city?: string;
    district?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    period?: Period;
}
export interface Period {
    start?: string;
    end?: string;
}
export interface Quantity {
    value?: number;
    comparator?: string;
    unit?: string;
    system?: string;
    code?: string;
}
export interface Range {
    low?: Quantity;
    high?: Quantity;
}
export interface Ratio {
    numerator?: Quantity;
    denominator?: Quantity;
}
export interface SampledData {
    origin: Quantity;
    period?: number;
    factor?: number;
    lowerLimit?: number;
    upperLimit?: number;
    dimensions?: number;
    data?: string;
}
export interface Attachment {
    contentType?: string;
    language?: string;
    data?: string;
    url?: string;
    size?: number;
    hash?: string;
    title?: string;
    creation?: string;
}
export interface Timing {
    event?: string[];
    repeat?: {
        boundsDuration?: Duration;
        boundsRange?: Range;
        boundsPeriod?: Period;
        count?: number;
        countMax?: number;
        duration?: number;
        durationMax?: number;
        durationUnit?: string;
        frequency?: number;
        frequencyMax?: number;
        period?: number;
        periodMax?: number;
        periodUnit?: string;
        dayOfWeek?: string[];
        timeOfDay?: string[];
        when?: string[];
        offset?: number;
    };
    code?: CodeableConcept;
}
export interface Duration extends Quantity {
}
export interface Age extends Quantity {
}
export interface Count extends Quantity {
}
export interface Distance extends Quantity {
}
export interface Money extends Quantity {
}
//# sourceMappingURL=index.d.ts.map