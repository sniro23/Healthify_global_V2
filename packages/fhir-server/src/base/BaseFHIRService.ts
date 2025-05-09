import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuditActionType } from '../models/auditEvent';

export abstract class BaseFHIRService {
  protected supabase: SupabaseClient;

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  protected async logAudit(
    userId: string,
    action: AuditActionType,
    resourceType: string,
    resourceId: string,
    outcome: string = 'success',
    outcomeDesc?: string
  ): Promise<void> {
    try {
      await this.supabase
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
      const { data, error } = await this.supabase
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