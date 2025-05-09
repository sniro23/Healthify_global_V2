/**
 * Simple logging utility for the FHIR server
 */
declare const logger: {
    info: (message: string, context?: any) => void;
    error: (message: string, context?: any) => void;
    warn: (message: string, context?: any) => void;
    debug: (message: string, context?: any) => void;
};
export default logger;
//# sourceMappingURL=logger.d.ts.map