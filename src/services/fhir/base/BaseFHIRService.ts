
import { supabase } from '@/integrations/supabase/client';
import { AuditLogType } from '@/models/fhir/auditEvent';

export abstract class BaseFHIRService {
  protected async logAudit(
    userId: string,
    action: AuditLogType,
    resourceType: string,
    resourceId: string,
    outcome: string = 'success',
    outcomeDesc?: string
  ): Promise<void> {
    try {
      await supabase
        .from('audit_logs')
        .insert({
          user_id: userId,
          action,
          resource_type: resourceType,
          resource_id: resourceId,
          details: {
            outcome,
            outcomeDesc,
            timestamp: new Date().toISOString()
          }
        });
    } catch (error) {
      console.error('Error logging audit:', error);
    }
  }

  protected async hasPermission(userId: string, resourceType: string, permission: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('user_permissions')
        .select('*')
        .eq('user_id', userId)
        .eq('resource_type', resourceType)
        .eq('permission', permission)
        .maybeSingle();
      
      if (error) {
        console.error('Error checking permission:', error);
        return false;
      }
      
      return !!data;
    } catch (error) {
      console.error('Error in hasPermission:', error);
      return false;
    }
  }
}
