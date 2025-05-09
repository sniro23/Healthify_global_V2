/**
 * Interface for audit log entry
 */
export interface AuditLogEntry {
    userId: string;
    action: 'create' | 'read' | 'update' | 'delete' | 'execute';
    resourceType: string;
    resourceId: string;
    details?: string;
}
/**
 * Service for logging audit events for FHIR resources
 */
export declare class AuditService {
    /**
     * Log an action performed on a FHIR resource
     * @param logEntry The audit log entry details
     */
    logAction(logEntry: AuditLogEntry): Promise<void>;
    /**
     * Get audit logs for a specific resource
     * @param resourceType The FHIR resource type
     * @param resourceId The FHIR resource ID
     * @returns Array of audit log entries
     */
    getAuditLogs(resourceType: string, resourceId: string): Promise<any[]>;
    /**
     * Get audit logs for a specific user
     * @param userId The user ID
     * @returns Array of audit log entries
     */
    getAuditLogsByUser(userId: string): Promise<any[]>;
}
//# sourceMappingURL=AuditService.d.ts.map