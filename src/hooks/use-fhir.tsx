
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
  return useQuery({
    queryKey: ['fhir', resourceType, 'search', params],
    queryFn: () => searchFHIRResources<T>(resourceType, params),
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
  return useQuery({
    queryKey: ['fhir', resourceType, id],
    queryFn: () => id ? readFHIRResource<T>(resourceType, id) : Promise.reject('ID is required'),
    enabled: !!id && (options?.enabled !== false),
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
  
  return useMutation({
    mutationFn: (resource: T) => createFHIRResource<T>(resource),
    onSuccess: (data) => {
      // Invalidate queries for this resource type
      queryClient.invalidateQueries({ queryKey: ['fhir', data.resourceType] });
      
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
  
  return useMutation({
    mutationFn: (resource: T) => updateFHIRResource<T>(resource),
    onSuccess: (data) => {
      // Invalidate specific resource query
      queryClient.invalidateQueries({ 
        queryKey: ['fhir', data.resourceType, data.id] 
      });
      
      // Invalidate search queries for this resource type
      queryClient.invalidateQueries({ 
        queryKey: ['fhir', data.resourceType, 'search'] 
      });
      
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
  
  return useMutation({
    mutationFn: ({ resourceType, id }: { resourceType: string; id: string }) => 
      deleteFHIRResource(resourceType, id),
    onSuccess: (_, variables) => {
      // Invalidate queries for this resource type
      queryClient.invalidateQueries({ 
        queryKey: ['fhir', variables.resourceType] 
      });
      
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
  
  const executeOperation = useCallback(
    async (id?: string, parameters?: any) => {
      try {
        return await executeFHIROperation<T>(resourceType, operation, id, parameters);
      } catch (error) {
        toast({
          title: "Operation Failed",
          description: error instanceof Error ? error.message : "An error occurred",
          variant: "destructive"
        });
        throw error;
      }
    },
    [resourceType, operation, toast]
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
