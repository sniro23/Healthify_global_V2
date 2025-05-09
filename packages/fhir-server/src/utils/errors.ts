/**
 * Custom error class for FHIR-related errors
 */
export class FHIRError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public operationOutcome?: any
  ) {
    super(message);
    this.name = 'FHIRError';
  }
}

export class ValidationError extends FHIRError {
  constructor(message: string, operationOutcome?: any) {
    super(message, 400, operationOutcome);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends FHIRError {
  constructor(message: string) {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends FHIRError {
  constructor(message: string) {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends FHIRError {
  constructor(message: string) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
} 