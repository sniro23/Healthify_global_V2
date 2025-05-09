'use client';

import { useCallback, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Patient, MedicalRecord, Appointment } from '@healthify/types';

interface PatientDataState {
  records: MedicalRecord[];
  appointments: Appointment[];
  isLoading: boolean;
  error: Error | null;
}

interface UsePatientDataReturn extends PatientDataState {
  fetchRecords: () => Promise<void>;
  fetchAppointments: () => Promise<void>;
  addRecord: (record: Omit<MedicalRecord, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateRecord: (id: string, data: Partial<MedicalRecord>) => Promise<void>;
  bookAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  cancelAppointment: (id: string) => Promise<void>;
}

export function usePatientData(patientId: string): UsePatientDataReturn {
  const [state, setState] = useState<PatientDataState>({
    records: [],
    appointments: [],
    isLoading: false,
    error: null,
  });

  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  const handleError = (error: Error) => {
    setState(prev => ({ ...prev, error, isLoading: false }));
    console.error('Patient data error:', error);
  };

  const fetchRecords = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const { data, error } = await supabase
        .from('medical_records')
        .select('*')
        .eq('patientId', patientId)
        .order('date', { ascending: false });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        records: data || [],
        isLoading: false,
      }));
    } catch (error) {
      handleError(error as Error);
    }
  }, [patientId, supabase]);

  const fetchAppointments = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('patientId', patientId)
        .order('date', { ascending: true });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        appointments: data || [],
        isLoading: false,
      }));
    } catch (error) {
      handleError(error as Error);
    }
  }, [patientId, supabase]);

  const addRecord = useCallback(async (record: Omit<MedicalRecord, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const { data, error } = await supabase
        .from('medical_records')
        .insert([{ ...record, patientId }])
        .select()
        .single();

      if (error) throw error;

      setState(prev => ({
        ...prev,
        records: [data, ...prev.records],
        isLoading: false,
      }));
    } catch (error) {
      handleError(error as Error);
    }
  }, [patientId, supabase]);

  const updateRecord = useCallback(async (id: string, data: Partial<MedicalRecord>) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const { error } = await supabase
        .from('medical_records')
        .update(data)
        .eq('id', id)
        .eq('patientId', patientId);

      if (error) throw error;

      setState(prev => ({
        ...prev,
        records: prev.records.map(record =>
          record.id === id ? { ...record, ...data } : record
        ),
        isLoading: false,
      }));
    } catch (error) {
      handleError(error as Error);
    }
  }, [patientId, supabase]);

  const bookAppointment = useCallback(async (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const { data, error } = await supabase
        .from('appointments')
        .insert([{ ...appointment, patientId }])
        .select()
        .single();

      if (error) throw error;

      setState(prev => ({
        ...prev,
        appointments: [...prev.appointments, data],
        isLoading: false,
      }));
    } catch (error) {
      handleError(error as Error);
    }
  }, [patientId, supabase]);

  const cancelAppointment = useCallback(async (id: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const { error } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', id)
        .eq('patientId', patientId);

      if (error) throw error;

      setState(prev => ({
        ...prev,
        appointments: prev.appointments.map(apt =>
          apt.id === id ? { ...apt, status: 'cancelled' } : apt
        ),
        isLoading: false,
      }));
    } catch (error) {
      handleError(error as Error);
    }
  }, [patientId, supabase]);

  return {
    ...state,
    fetchRecords,
    fetchAppointments,
    addRecord,
    updateRecord,
    bookAppointment,
    cancelAppointment,
  };
} 