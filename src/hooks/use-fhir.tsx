
import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  searchFHIRResources, 
  readFHIRResource, 
  createFHIRResource, 
  updateFHIRResource, 
  deleteFHIRResource,
  executeFHIROperation,
  validateFHIRResource
} from '@/services/fhir/fhirApiService';
import { FHIRBundle, processTransactionBundle, processBatchBundle } from '@/services/fhir/fhirBundleService';
import { isResourceTypeSupported, isOperationSupported } from '@/services/fhir/capabilityStatementService';
import { useAuditLog, AuditActionType, AuditOutcomeCode } from '@/services/fhir/auditLogService';
import { useSMARTAuth } from '@/services/auth/smartAuthService';
import { useToast } from './use-toast';

/**
 * Generic FHIR resource type
 */
interface FHIRResource {
  resourceType: string;
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
  };
}

/**
 * FHIR search parameters type
 */
interface FHIRSearchParams {
  [key: string]: string | string[] | number | boolean | undefined;
}

/**
 * Hook for searching FHIR resources
 */
export function useFHIRSearch<T extends FHIRResource>(
  resourceType: string,
  params?: FHIRSearchParams,
  options?: {
    enabled?: boolean;
    refetchInterval?: number | false;
    refetchOnWindowFocus?: boolean;
  }
) {
  const auditLog = useAuditLog();
  const { isAuthorized, hasScope } = useSMARTAuth();
  
  // Check if resource type is supported by the server
  const isSupported = isResourceTypeSupported(resourceType);
  
  // Check if user has appropriate scope
  const hasReadScope = hasScope(`${resourceType}.read`) || hasScope(`${resourceType}.*`) || hasScope('*.*');
  
  return useQuery({
    queryKey: ['fhir', resourceType, 'search', params],
    queryFn: async () => {
      // Check if resource type is supported
      if (!isSupported) {
        throw new Error(`Resource type ${resourceType} is not supported by this FHIR server`);
      }
      
      // Check if user has appropriate scope
      if (isAuthorized() && !hasReadScope) {
        throw new Error(`Missing required scope to read ${resourceType} resources`);
      }
      
      const results = await searchFHIRResources<T>(resourceType, params);
      
      // Audit the search access
      auditLog.logAccess(
        resourceType, 
        'search', 
        AuditActionType.READ,
        AuditOutcomeCode.SUCCESS,
        `Search ${resourceType} with params: ${JSON.stringify(params)}`
      );
      
      return results;
    },
    enabled: (options?.enabled !== false) && isSupported,
    ...options
  });
}

/**
 * Hook for reading a specific FHIR resource
 */
export function useFHIRResource<T extends FHIRResource>(
  resourceType: string,
  id: string | undefined,
  options?: {
    enabled?: boolean;
    refetchInterval?: number | false;
    refetchOnWindowFocus?: boolean;
  }
) {
  const auditLog = useAuditLog();
  const { isAuthorized, hasScope } = useSMARTAuth();
  
  // Check if resource type is supported by the server
  const isSupported = isResourceTypeSupported(resourceType);
  
  // Check if user has appropriate scope
  const hasReadScope = hasScope(`${resourceType}.read`) || hasScope(`${resourceType}.*`) || hasScope('*.*');
  
  return useQuery({
    queryKey: ['fhir', resourceType, id],
    queryFn: async () => {
      // Check if resource type is supported
      if (!isSupported) {
        throw new Error(`Resource type ${resourceType} is not supported by this FHIR server`);
      }
      
      // Check if user has appropriate scope
      if (isAuthorized() && !hasReadScope) {
        throw new Error(`Missing required scope to read ${resourceType} resource`);
      }
      
      if (!id) {
        throw new Error('ID is required');
      }
      
      const result = await readFHIRResource<T>(resourceType, id);
      
      // Audit the resource access
      auditLog.logAccess(
        resourceType, 
        id, 
        AuditActionType.READ,
        AuditOutcomeCode.SUCCESS
      );
      
      return result;
    },
    enabled: !!id && (options?.enabled !== false) && isSupported,
    ...options
  });
}

/**
 * Hook for creating FHIR resources
 */
export function useFHIRCreate<T extends FHIRResource>(options?: {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const auditLog = useAuditLog();
  const { isAuthorized, hasScope } = useSMARTAuth();
  
  return useMutation({
    mutationFn: async (resource: T) => {
      // Check if resource type is supported
      const isSupported = isResourceTypeSupported(resource.resourceType);
      if (!isSupported) {
        throw new Error(`Resource type ${resource.resourceType} is not supported by this FHIR server`);
      }
      
      // Check if user has appropriate scope
      const hasWriteScope = hasScope(`${resource.resourceType}.write`) || 
        hasScope(`${resource.resourceType}.*`) || 
        hasScope('*.*');
      
      if (isAuthorized() && !hasWriteScope) {
        throw new Error(`Missing required scope to create ${resource.resourceType} resources`);
      }
      
      return createFHIRResource<T>(resource);
    },
    onSuccess: (data) => {
      // Invalidate queries for this resource type
      queryClient.invalidateQueries({ queryKey: ['fhir', data.resourceType] });
      
      // Audit the resource creation
      auditLog.logAccess(
        data.resourceType, 
        data.id || 'unknown', 
        AuditActionType.CREATE,
        AuditOutcomeCode.SUCCESS
      );
      
      toast({
        title: "Resource Created",
        description: `${data.resourceType} was created successfully`,
      });
      
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      toast({
        title: "Creation Failed",
        description: error.message,
        variant: "destructive"
      });
      
      options?.onError?.(error);
    }
  });
}

/**
 * Hook for updating FHIR resources
 */
export function useFHIRUpdate<T extends FHIRResource>(options?: {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const auditLog = useAuditLog();
  const { isAuthorized, hasScope } = useSMARTAuth();
  
  return useMutation({
    mutationFn: async (resource: T) => {
      // Check if resource type is supported
      const isSupported = isResourceTypeSupported(resource.resourceType);
      if (!isSupported) {
        throw new Error(`Resource type ${resource.resourceType} is not supported by this FHIR server`);
      }
      
      // Check if user has appropriate scope
      const hasWriteScope = hasScope(`${resource.resourceType}.write`) || 
        hasScope(`${resource.resourceType}.*`) || 
        hasScope('*.*');
      
      if (isAuthorized() && !hasWriteScope) {
        throw new Error(`Missing required scope to update ${resource.resourceType} resources`);
      }
      
      return updateFHIRResource<T>(resource);
    },
    onSuccess: (data) => {
      // Invalidate specific resource query
      queryClient.invalidateQueries({ 
        queryKey: ['fhir', data.resourceType, data.id] 
      });
      
      // Invalidate search queries for this resource type
      queryClient.invalidateQueries({ 
        queryKey: ['fhir', data.resourceType, 'search'] 
      });
      
      // Audit the resource update
      auditLog.logAccess(
        data.resourceType, 
        data.id || 'unknown', 
        AuditActionType.UPDATE,
        AuditOutcomeCode.SUCCESS
      );
      
      toast({
        title: "Resource Updated",
        description: `${data.resourceType} was updated successfully`,
      });
      
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive"
      });
      
      options?.onError?.(error);
    }
  });
}

/**
 * Hook for deleting FHIR resources
 */
export function useFHIRDelete(options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const auditLog = useAuditLog();
  const { isAuthorized, hasScope } = useSMARTAuth();
  
  return useMutation({
    mutationFn: async ({ resourceType, id }: { resourceType: string; id: string }) => {
      // Check if resource type is supported
      const isSupported = isResourceTypeSupported(resourceType);
      if (!isSupported) {
        throw new Error(`Resource type ${resourceType} is not supported by this FHIR server`);
      }
      
      // Check if user has appropriate scope
      const hasWriteScope = hasScope(`${resourceType}.write`) || 
        hasScope(`${resourceType}.*`) || 
        hasScope('*.*');
      
      if (isAuthorized() && !hasWriteScope) {
        throw new Error(`Missing required scope to delete ${resourceType} resources`);
      }
      
      return deleteFHIRResource(resourceType, id);
    },
    onSuccess: (_, variables) => {
      // Invalidate queries for this resource type
      queryClient.invalidateQueries({ 
        queryKey: ['fhir', variables.resourceType] 
      });
      
      // Audit the resource deletion
      auditLog.logAccess(
        variables.resourceType, 
        variables.id, 
        AuditActionType.DELETE,
        AuditOutcomeCode.SUCCESS
      );
      
      toast({
        title: "Resource Deleted",
        description: `${variables.resourceType} was deleted successfully`,
      });
      
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      toast({
        title: "Deletion Failed",
        description: error.message,
        variant: "destructive"
      });
      
      options?.onError?.(error);
    }
  });
}

/**
 * Hook for executing FHIR operations
 */
export function useFHIROperation<T>(
  resourceType: string,
  operation: string,
) {
  const { toast } = useToast();
  const auditLog = useAuditLog();
  const { isAuthorized, hasScope } = useSMARTAuth();
  
  const executeOperation = useCallback(
    async (id?: string, parameters?: any) => {
      try {
        // Check if operation is supported
        const isSupported = isOperationSupported(resourceType, operation);
        if (!isSupported) {
          throw new Error(`Operation ${operation} is not supported for ${resourceType}`);
        }
        
        // Check if user has appropriate scope
        const hasOpScope = hasScope(`${resourceType}.*`) || hasScope('*.*');
        
        if (isAuthorized() && !hasOpScope) {
          throw new Error(`Missing required scope to execute operations on ${resourceType}`);
        }
        
        const result = await executeFHIROperation<T>(resourceType, operation, id, parameters);
        
        // Audit the operation
        auditLog.logOperation(
          resourceType,
          operation,
          id,
          AuditOutcomeCode.SUCCESS
        );
        
        return result;
      } catch (error) {
        // Audit the failed operation
        auditLog.logOperation(
          resourceType,
          operation,
          id,
          AuditOutcomeCode.SERIOUS,
          error instanceof Error ? error.message : "An error occurred"
        );
        
        toast({
          title: "Operation Failed",
          description: error instanceof Error ? error.message : "An error occurred",
          variant: "destructive"
        });
        throw error;
      }
    },
    [resourceType, operation, toast, auditLog, isAuthorized, hasScope]
  );
  
  return { executeOperation };
}

/**
 * Hook for validating FHIR resources
 */
export function useFHIRValidate<T extends FHIRResource>() {
  const [validationResults, setValidationResults] = useState<{
    valid: boolean;
    issues?: any[];
  } | null>(null);
  
  const { toast } = useToast();
  
  const validate = useCallback(
    async (resource: T) => {
      try {
        const results = await validateFHIRResource(resource);
        setValidationResults(results);
        
        if (results.valid) {
          toast({
            title: "Validation Successful",
            description: "Resource is valid against FHIR profiles",
          });
        } else {
          toast({
            title: "Validation Issues",
            description: `Found ${results.issues?.length || 0} issues with this resource`,
            variant: "destructive"  // Changed from "warning" to "destructive"
          });
        }
        
        return results;
      } catch (error) {
        toast({
          title: "Validation Failed",
          description: error instanceof Error ? error.message : "An error occurred",
          variant: "destructive"
        });
        throw error;
      }
    },
    [toast]
  );
  
  return { validate, validationResults };
}

/**
 * Hook for processing FHIR bundles (transaction, batch)
 */
export function useFHIRBundle(options?: {
  onSuccess?: (bundle: FHIRBundle) => void;
  onError?: (error: Error) => void;
}) {
  const { toast } = useToast();
  const auditLog = useAuditLog();
  const { isAuthorized, hasScope } = useSMARTAuth();
  
  // Transaction bundle processing
  const transactionMutation = useMutation({
    mutationFn: async (bundle: FHIRBundle) => {
      // Check if user has appropriate scope
      if (isAuthorized() && !hasScope('Bundle.write')) {
        throw new Error('Missing required scope to process transaction bundles');
      }
      
      if (bundle.type !== 'transaction') {
        throw new Error('Bundle type must be "transaction"');
      }
      
      return processTransactionBundle(bundle);
    },
    onSuccess: (data) => {
      // Audit the transaction
      auditLog.logOperation(
        'Bundle',
        'transaction',
        data.id,
        AuditOutcomeCode.SUCCESS
      );
      
      toast({
        title: "Transaction Completed",
        description: `Processed ${data.entry?.length || 0} operations successfully`,
      });
      
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      // Audit the failed transaction
      auditLog.logOperation(
        'Bundle',
        'transaction',
        undefined,
        AuditOutcomeCode.SERIOUS,
        error.message
      );
      
      toast({
        title: "Transaction Failed",
        description: error.message,
        variant: "destructive"
      });
      
      options?.onError?.(error);
    }
  });
  
  // Batch bundle processing
  const batchMutation = useMutation({
    mutationFn: async (bundle: FHIRBundle) => {
      // Check if user has appropriate scope
      if (isAuthorized() && !hasScope('Bundle.write')) {
        throw new Error('Missing required scope to process batch bundles');
      }
      
      if (bundle.type !== 'batch') {
        throw new Error('Bundle type must be "batch"');
      }
      
      return processBatchBundle(bundle);
    },
    onSuccess: (data) => {
      // Audit the batch operation
      auditLog.logOperation(
        'Bundle',
        'batch',
        data.id,
        AuditOutcomeCode.SUCCESS
      );
      
      toast({
        title: "Batch Completed",
        description: `Processed ${data.entry?.length || 0} operations`,
      });
      
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      // Audit the failed batch operation
      auditLog.logOperation(
        'Bundle',
        'batch',
        undefined,
        AuditOutcomeCode.SERIOUS,
        error.message
      );
      
      toast({
        title: "Batch Failed",
        description: error.message,
        variant: "destructive"
      });
      
      options?.onError?.(error);
    }
  });
  
  return {
    processTransaction: transactionMutation.mutate,
    processBatch: batchMutation.mutate,
    isProcessing: transactionMutation.isPending || batchMutation.isPending
  };
}
