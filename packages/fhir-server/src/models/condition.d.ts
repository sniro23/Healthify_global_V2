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
export declare function getConditionStatusDisplay(condition: FHIRCondition): string;
//# sourceMappingURL=condition.d.ts.map