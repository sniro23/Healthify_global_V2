import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../supabase';
import logger from '../logger';
import { FHIRError } from '../utils/errors';

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
 * Interface for Supabase error response
 */
interface SupabaseError {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}

/**
 * Service for logging audit events for FHIR resources
 */
export class AuditService {
  /**
   * Log an action performed on a FHIR resource
   * @param logEntry The audit log entry details
   */
  async logAction(logEntry: AuditLogEntry): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('audit_logs')
        .insert({
          id: uuidv4(),
          user_id: logEntry.userId,
          action: logEntry.action,
          resource_type: logEntry.resourceType,
          resource_id: logEntry.resourceId,
          details: logEntry.details,
          timestamp: new Date().toISOString()
        });

      if (error) {
        logger.error('Error creating audit log', { error, logEntry });
      }
    } catch (error) {
      logger.error('Unexpected error creating audit log', { error, logEntry });
    }
  }

  /**
   * Get audit logs for a specific resource
   * @param resourceType The FHIR resource type
   * @param resourceId The FHIR resource ID
   * @returns Array of audit log entries
   */
  async getAuditLogs(resourceType: string, resourceId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .eq('resource_type', resourceType)
        .eq('resource_id', resourceId)
        .order('timestamp', { ascending: false });

      if (error) {
        const supabaseError = error as SupabaseError;
        logger.error('Error fetching audit logs', { error, resourceType, resourceId });
        throw new FHIRError(`Failed to fetch audit logs: ${supabaseError.message}`, 500);
      }

      return data || [];
    } catch (error) {
      if (error instanceof FHIRError) {
        throw error;
      }
      logger.error('Unexpected error fetching audit logs', { error });
      throw new FHIRError('Failed to fetch audit logs due to an unexpected error', 500);
    }
  }

  /**
   * Get audit logs for a specific user
   * @param userId The user ID
   * @returns Array of audit log entries
   */
  async getAuditLogsByUser(userId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false });

      if (error) {
        const supabaseError = error as SupabaseError;
        logger.error('Error fetching user audit logs', { error, userId });
        throw new FHIRError(`Failed to fetch user audit logs: ${supabaseError.message}`, 500);
      }

      return data || [];
    } catch (error) {
      if (error instanceof FHIRError) {
        throw error;
      }
      logger.error('Unexpected error fetching user audit logs', { error });
      throw new FHIRError('Failed to fetch user audit logs due to an unexpected error', 500);
    }
  }
} 