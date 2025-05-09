/**
 * Custom error class for FHIR-related errors
 */
export declare class FHIRError extends Error {
    statusCode: number;
    operationOutcome?: any | undefined;
    constructor(message: string, statusCode: number, operationOutcome?: any | undefined);
}
export declare class ValidationError extends FHIRError {
    constructor(message: string, operationOutcome?: any);
}
export declare class AuthenticationError extends FHIRError {
    constructor(message: string);
}
export declare class AuthorizationError extends FHIRError {
    constructor(message: string);
}
export declare class NotFoundError extends FHIRError {
    constructor(message: string);
}
//# sourceMappingURL=errors.d.ts.map