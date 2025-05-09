import { SupabaseClient } from '@supabase/supabase-js';
import { AuditActionType } from '../models/auditEvent';
export declare abstract class BaseFHIRService {
    protected supabase: SupabaseClient;
    constructor(supabaseUrl: string, supabaseKey: string);
    protected logAudit(userId: string, action: AuditActionType, resourceType: string, resourceId: string, outcome?: string, outcomeDesc?: string): Promise<void>;
    protected hasPermission(userId: string, resourceType: string, permission: string): Promise<boolean>;
}
//# sourceMappingURL=BaseFHIRService.d.ts.map