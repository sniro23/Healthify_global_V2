'use client';

import { useCallback, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Appointment } from '@healthify/types';

interface TimeSlot {
  start: string;
  end: string;
  isAvailable: boolean;
}

interface Schedule {
  date: string;
  slots: TimeSlot[];
}

interface DoctorScheduleState {
  schedules: Schedule[];
  appointments: Appointment[];
  isLoading: boolean;
  error: Error | null;
}

interface UseDoctorScheduleReturn extends DoctorScheduleState {
  fetchSchedule: (startDate: string, endDate: string) => Promise<void>;
  fetchAppointments: (startDate: string, endDate: string) => Promise<void>;
  addTimeSlot: (date: string, slot: Omit<TimeSlot, 'isAvailable'>) => Promise<void>;
  removeTimeSlot: (date: string, slotStart: string) => Promise<void>;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => Promise<void>;
}

export function useDoctorSchedule(doctorId: string): UseDoctorScheduleReturn {
  const [state, setState] = useState<DoctorScheduleState>({
    schedules: [],
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
    console.error('Doctor schedule error:', error);
  };

  const fetchSchedule = useCallback(async (startDate: string, endDate: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const { data, error } = await supabase
        .from('doctor_schedules')
        .select('*')
        .eq('doctorId', doctorId)
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: true });

      if (error) throw error;

      const schedules = data.map(schedule => ({
        date: schedule.date,
        slots: schedule.slots || [],
      }));

      setState(prev => ({
        ...prev,
        schedules,
        isLoading: false,
      }));
    } catch (error) {
      handleError(error as Error);
    }
  }, [doctorId, supabase]);

  const fetchAppointments = useCallback(async (startDate: string, endDate: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('doctorId', doctorId)
        .gte('date', startDate)
        .lte('date', endDate)
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
  }, [doctorId, supabase]);

  const addTimeSlot = useCallback(async (date: string, slot: Omit<TimeSlot, 'isAvailable'>) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // First, check if a schedule exists for this date
      const { data: existingSchedule, error: fetchError } = await supabase
        .from('doctor_schedules')
        .select('*')
        .eq('doctorId', doctorId)
        .eq('date', date)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') throw fetchError; // PGRST116 is "not found"

      if (existingSchedule) {
        // Update existing schedule
        const newSlots = [...existingSchedule.slots, { ...slot, isAvailable: true }];
        const { error } = await supabase
          .from('doctor_schedules')
          .update({ slots: newSlots })
          .eq('id', existingSchedule.id);

        if (error) throw error;
      } else {
        // Create new schedule
        const { error } = await supabase
          .from('doctor_schedules')
          .insert([{
            doctorId,
            date,
            slots: [{ ...slot, isAvailable: true }],
          }]);

        if (error) throw error;
      }

      // Refresh schedules
      await fetchSchedule(date, date);
    } catch (error) {
      handleError(error as Error);
    }
  }, [doctorId, supabase, fetchSchedule]);

  const removeTimeSlot = useCallback(async (date: string, slotStart: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const { data: schedule, error: fetchError } = await supabase
        .from('doctor_schedules')
        .select('*')
        .eq('doctorId', doctorId)
        .eq('date', date)
        .single();

      if (fetchError) throw fetchError;

      const newSlots = schedule.slots.filter(slot => slot.start !== slotStart);
      
      const { error } = await supabase
        .from('doctor_schedules')
        .update({ slots: newSlots })
        .eq('id', schedule.id);

      if (error) throw error;

      // Refresh schedules
      await fetchSchedule(date, date);
    } catch (error) {
      handleError(error as Error);
    }
  }, [doctorId, supabase, fetchSchedule]);

  const updateAppointmentStatus = useCallback(async (id: string, status: Appointment['status']) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id)
        .eq('doctorId', doctorId);

      if (error) throw error;

      setState(prev => ({
        ...prev,
        appointments: prev.appointments.map(apt =>
          apt.id === id ? { ...apt, status } : apt
        ),
        isLoading: false,
      }));
    } catch (error) {
      handleError(error as Error);
    }
  }, [doctorId, supabase]);

  return {
    ...state,
    fetchSchedule,
    fetchAppointments,
    addTimeSlot,
    removeTimeSlot,
    updateAppointmentStatus,
  };
} 