import { useState, useEffect } from 'react';
import { useAuth } from '@healthify/ui-kit/auth-module';
import { fhirClient } from '../lib/fhir/client';
import type { Patient, Observation, Condition, DiagnosticReport } from '@healthify/fhir-types';

interface FHIRDataState {
  patient: Patient | null;
  observations: Observation[];
  conditions: Condition[];
  diagnosticReports: DiagnosticReport[];
  isLoading: boolean;
  error: Error | null;
}

export function useFHIRData() {
  const { user } = useAuth();
  const [state, setState] = useState<FHIRDataState>({
    patient: null,
    observations: [],
    conditions: [],
    diagnosticReports: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true }));
        
        // Fetch all data in parallel
        const [patient, observations, conditions, diagnosticReports] = await Promise.all([
          fhirClient.getPatient(user.id),
          fhirClient.getObservations(user.id),
          fhirClient.getConditions(user.id),
          fhirClient.getDiagnosticReports(user.id),
        ]);

        setState({
          patient,
          observations,
          conditions,
          diagnosticReports,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error fetching FHIR data:', error);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error as Error,
        }));
      }
    };

    fetchData();
  }, [user]);

  const refreshData = async () => {
    if (!user) return;

    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Fetch all data in parallel
      const [patient, observations, conditions, diagnosticReports] = await Promise.all([
        fhirClient.getPatient(user.id),
        fhirClient.getObservations(user.id),
        fhirClient.getConditions(user.id),
        fhirClient.getDiagnosticReports(user.id),
      ]);

      setState({
        patient,
        observations,
        conditions,
        diagnosticReports,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error refreshing FHIR data:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error as Error,
      }));
    }
  };

  return {
    ...state,
    refreshData,
  };
} 