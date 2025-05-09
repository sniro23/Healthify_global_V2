export { FHIRError } from './utils/errors';
export { AuditService } from './resources/AuditService';
export interface SearchParams {
    [key: string]: string;
}
export interface FHIRClientConfig {
    baseUrl: string;
    headers?: Record<string, string>;
}
/**
 * Client for interacting with FHIR resources
 */
export declare class FHIRClient {
    private client;
    constructor(config: FHIRClientConfig);
    getResource(resourceType: string, id: string): Promise<any>;
    searchResources(resourceType: string, params: Record<string, string>): Promise<any>;
    createResource(resource: any): Promise<any>;
    updateResource(resource: any): Promise<any>;
    deleteResource(resourceType: string, id: string): Promise<any>;
}
/**
 * Factory function to create a FHIR client
 */
export declare function createFHIRClient(config?: FHIRClientConfig): FHIRClient;
export * from './utils/errors';
//# sourceMappingURL=index.d.ts.map