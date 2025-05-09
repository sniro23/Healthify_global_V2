import { useState, useEffect } from 'react';
import { useAuth } from '@healthify/ui-kit/auth-module';
import { fhirClient } from '../lib/fhir/client';
import type { Appointment } from '@healthify/fhir-types';

export type AppointmentStatus = 'proposed' | 'pending' | 'booked' | 'arrived' | 'fulfilled' | 'cancelled' | 'no-show' | 'entered-in-error';

interface AppointmentFilters {
  startDate?: Date;
  endDate?: Date;
  status?: AppointmentStatus[];
}

interface AppointmentState {
  appointments: Appointment[];
  isLoading: boolean;
  error: Error | null;
}

export function useAppointments(filters?: AppointmentFilters) {
  const { user } = useAuth();
  const [state, setState] = useState<AppointmentState>({
    appointments: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!user) return;

    const fetchAppointments = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true }));
        
        // Build query parameters
        const queryParams: any = {
          patient: user.id,
        };

        if (filters?.startDate) {
          queryParams.start = filters.startDate.toISOString();
        }
        if (filters?.endDate) {
          queryParams.end = filters.endDate.toISOString();
        }
        if (filters?.status) {
          queryParams.status = filters.status.join(',');
        }

        // Fetch appointments from FHIR server
        const appointments = await fhirClient.searchResources('Appointment', queryParams);
        
        setState({
          appointments,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error as Error,
        }));
      }
    };

    fetchAppointments();
  }, [user, filters]);

  const bookAppointment = async (appointmentData: Partial<Appointment>) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Create new appointment
      const newAppointment = await fhirClient.createResource({
        resourceType: 'Appointment',
        status: 'proposed',
        ...appointmentData,
        participant: [
          {
            actor: {
              reference: `Patient/${user?.id}`,
            },
            status: 'accepted',
          },
          ...(appointmentData.participant || []),
        ],
      });

      // Update local state
      setState(prev => ({
        appointments: [...prev.appointments, newAppointment],
        isLoading: false,
        error: null,
      }));

      return newAppointment;
    } catch (error) {
      console.error('Error booking appointment:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error as Error,
      }));
      throw error;
    }
  };

  const cancelAppointment = async (appointmentId: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Update appointment status to cancelled
      const updatedAppointment = await fhirClient.updateResource({
        resourceType: 'Appointment',
        id: appointmentId,
        status: 'cancelled',
      });

      // Update local state
      setState(prev => ({
        appointments: prev.appointments.map(apt => 
          apt.id === appointmentId ? updatedAppointment : apt
        ),
        isLoading: false,
        error: null,
      }));

      return true;
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error as Error,
      }));
      return false;
    }
  };

  const rescheduleAppointment = async (appointmentId: string, newDateTime: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Update appointment start and end times
      const updatedAppointment = await fhirClient.updateResource({
        resourceType: 'Appointment',
        id: appointmentId,
        start: newDateTime,
        end: new Date(new Date(newDateTime).getTime() + 30 * 60000).toISOString(), // Add 30 minutes
      });

      // Update local state
      setState(prev => ({
        appointments: prev.appointments.map(apt => 
          apt.id === appointmentId ? updatedAppointment : apt
        ),
        isLoading: false,
        error: null,
      }));

      return true;
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error as Error,
      }));
      return false;
    }
  };

  return {
    ...state,
    bookAppointment,
    cancelAppointment,
    rescheduleAppointment,
  };
} 