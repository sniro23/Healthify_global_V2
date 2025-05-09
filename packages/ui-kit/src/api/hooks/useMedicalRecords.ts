'use client';

import { useState, useEffect } from 'react';
import apiClient, { ApiResponse } from '../client';

// Medical record type definition
export interface MedicalRecord {
  id: string;
  date: string;
  provider: string;
  type: string;
  notes: string;
  attachments?: string[];
  patientId?: string;
}

// Hook parameters
interface UseMedicalRecordsParams {
  patientId?: string;
  limit?: number;
  initialData?: MedicalRecord[];
}

// Hook return type
interface UseMedicalRecordsReturn {
  records: MedicalRecord[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Mock data (will be replaced by API calls)
const MOCK_RECORDS: MedicalRecord[] = [
  {
    id: 'rec1',
    date: 'May 15, 2024',
    provider: 'Dr. Sarah Johnson',
    type: 'Annual Physical',
    notes: 'Patient is in good health. Blood pressure normal. Recommended annual follow-up.'
  },
  {
    id: 'rec2',
    date: 'March 3, 2024',
    provider: 'Dr. Michael Chen',
    type: 'Vaccination',
    notes: 'Administered seasonal flu vaccine. No adverse reactions observed.'
  },
  {
    id: 'rec3',
    date: 'January 12, 2024',
    provider: 'Dr. Emily Rodriguez',
    type: 'Lab Results',
    notes: 'Blood work results normal. Cholesterol slightly elevated - dietary changes recommended.'
  }
];

/**
 * Hook for fetching medical records
 */
export function useMedicalRecords({
  patientId,
  limit = 10,
  initialData,
}: UseMedicalRecordsParams = {}): UseMedicalRecordsReturn {
  const [records, setRecords] = useState<MedicalRecord[]>(initialData || []);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<Error | null>(null);

  const fetchRecords = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, would use the API client to fetch data
      // const response = await apiClient.get<MedicalRecord[]>(`/patients/${patientId}/records?limit=${limit}`);
      
      // For now, using mock data with a delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter by patientId if provided
      const filteredRecords = patientId 
        ? MOCK_RECORDS.filter(record => record.patientId === patientId)
        : MOCK_RECORDS;
        
      // Apply limit if needed
      const limitedRecords = limit ? filteredRecords.slice(0, limit) : filteredRecords;
      
      setRecords(limitedRecords);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch medical records'));
      console.error('Error fetching medical records:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialData) {
      fetchRecords();
    }
  }, [patientId, limit]);

  return {
    records,
    isLoading,
    error,
    refetch: fetchRecords,
  };
}

/**
 * Hook for fetching a single medical record by ID
 */
export function useMedicalRecord(recordId: string): ApiResponse<MedicalRecord> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<ApiResponse<MedicalRecord>>({
    data: null,
    error: null,
    loading: true,
  });

  const fetchRecord = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // In a real app, would use the API client
      // const response = await apiClient.get<MedicalRecord>(`/records/${recordId}`);
      
      // For now, using mock data with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const record = MOCK_RECORDS.find(r => r.id === recordId);
      
      if (!record) {
        throw new Error(`Medical record with ID ${recordId} not found`);
      }
      
      setState({
        data: record,
        error: null,
        loading: false,
      });
    } catch (err) {
      setState({
        data: null,
        error: err instanceof Error ? err : new Error('Failed to fetch medical record'),
        loading: false,
      });
      console.error(`Error fetching medical record ${recordId}:`, err);
    }
  };

  useEffect(() => {
    fetchRecord();
  }, [recordId]);

  return {
    ...state,
    refetch: fetchRecord,
  };
} 