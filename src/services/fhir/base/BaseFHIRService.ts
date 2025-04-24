
import { supabase } from '@/integrations/supabase/client';
import { AuditLogType } from '@/models/fhir/auditEvent';
import { Json } from '@/integrations/supabase/types';

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
      // Use custom query since user_permissions table might not be in Supabase schema yet
      const { data, error } = await supabase
        .from('user_permissions')
        .select('*')
        .eq('user_id', userId)
        .eq('resource_type', resourceType)
        .eq('permission', permission);
      
      if (error) {
        console.error('Error checking permission:', error);
        return false;
      }
      
      return data && data.length > 0;
    } catch (error) {
      console.error('Error in hasPermission:', error);
      return false;
    }
  }
}
