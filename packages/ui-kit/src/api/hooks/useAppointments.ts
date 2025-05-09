'use client';

import { useState, useEffect } from 'react';
import apiClient, { ApiResponse } from '../client';

// Appointment status types
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';

// Appointment type definition
export interface Appointment {
  id: string;
  patientId?: string;
  providerId: string;
  providerName: string;
  specialty?: string;
  date: string;
  time: string;
  duration: number; // in minutes
  status: AppointmentStatus;
  type: string;
  location?: string;
  notes?: string;
  virtualMeetingUrl?: string;
}

// Hook parameters
interface UseAppointmentsParams {
  patientId?: string;
  providerId?: string;
  status?: AppointmentStatus | AppointmentStatus[];
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  initialData?: Appointment[];
}

// Hook return type
interface UseAppointmentsReturn {
  appointments: Appointment[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  cancelAppointment: (appointmentId: string) => Promise<boolean>;
  rescheduleAppointment: (appointmentId: string, newDate: string, newTime: string) => Promise<boolean>;
}

// Mock data
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt1',
    providerId: 'prov1',
    providerName: 'Dr. Sarah Johnson',
    specialty: 'Internal Medicine',
    date: '2024-06-15',
    time: '09:00',
    duration: 30,
    status: 'confirmed',
    type: 'Annual Physical',
    location: 'Main Clinic, Room 102',
    notes: 'Please arrive 15 minutes early to complete paperwork'
  },
  {
    id: 'apt2',
    providerId: 'prov2',
    providerName: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    date: '2024-06-22',
    time: '14:30',
    duration: 45,
    status: 'scheduled',
    type: 'Follow-up',
    location: 'Cardiology Center, Room 305'
  },
  {
    id: 'apt3',
    providerId: 'prov3',
    providerName: 'Dr. Emily Rodriguez',
    specialty: 'Dermatology',
    date: '2024-07-05',
    time: '11:15',
    duration: 30,
    status: 'scheduled',
    type: 'Consultation',
    virtualMeetingUrl: 'https://telehealth.healthify.com/dr-rodriguez'
  },
  {
    id: 'apt4',
    providerId: 'prov4',
    providerName: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    date: '2024-05-28',
    time: '10:00',
    duration: 60,
    status: 'completed',
    type: 'Post-Surgery Evaluation',
    location: 'Orthopedic Center, Room 210',
    notes: 'Bring previous X-rays and reports'
  }
];

/**
 * Hook for fetching appointments with filtering options
 */
export function useAppointments({
  patientId,
  providerId,
  status,
  startDate,
  endDate,
  limit = 10,
  initialData,
}: UseAppointmentsParams = {}): UseAppointmentsReturn {
  const [appointments, setAppointments] = useState<Appointment[]>(initialData || []);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<Error | null>(null);

  const fetchAppointments = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, would use the API client to fetch data
      // const response = await apiClient.get<Appointment[]>(`/appointments?patientId=${patientId}&...`);
      
      // For now, using mock data with a delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Apply filters
      let filteredAppointments = [...MOCK_APPOINTMENTS];
      
      // Filter by patientId
      if (patientId) {
        filteredAppointments = filteredAppointments.filter(apt => apt.patientId === patientId);
      }
      
      // Filter by providerId
      if (providerId) {
        filteredAppointments = filteredAppointments.filter(apt => apt.providerId === providerId);
      }
      
      // Filter by status
      if (status) {
        const statusArray = Array.isArray(status) ? status : [status];
        filteredAppointments = filteredAppointments.filter(apt => statusArray.includes(apt.status));
      }
      
      // Filter by date range
      if (startDate) {
        filteredAppointments = filteredAppointments.filter(apt => 
          new Date(apt.date) >= startDate
        );
      }
      
      if (endDate) {
        filteredAppointments = filteredAppointments.filter(apt => 
          new Date(apt.date) <= endDate
        );
      }
      
      // Sort by date (upcoming first)
      filteredAppointments.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA.getTime() - dateB.getTime();
      });
      
      // Apply limit
      if (limit) {
        filteredAppointments = filteredAppointments.slice(0, limit);
      }
      
      setAppointments(filteredAppointments);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch appointments'));
      console.error('Error fetching appointments:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Cancel an appointment
   */
  const cancelAppointment = async (appointmentId: string): Promise<boolean> => {
    try {
      // In a real app, would call an API endpoint
      // await apiClient.put(`/appointments/${appointmentId}/cancel`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId ? { ...apt, status: 'cancelled' as AppointmentStatus } : apt
        )
      );
      
      return true;
    } catch (err) {
      console.error(`Error cancelling appointment ${appointmentId}:`, err);
      return false;
    }
  };
  
  /**
   * Reschedule an appointment
   */
  const rescheduleAppointment = async (
    appointmentId: string, 
    newDate: string, 
    newTime: string
  ): Promise<boolean> => {
    try {
      // In a real app, would call an API endpoint
      // await apiClient.put(`/appointments/${appointmentId}/reschedule`, { date: newDate, time: newTime });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, date: newDate, time: newTime, status: 'scheduled' as AppointmentStatus } 
            : apt
        )
      );
      
      return true;
    } catch (err) {
      console.error(`Error rescheduling appointment ${appointmentId}:`, err);
      return false;
    }
  };

  useEffect(() => {
    if (!initialData) {
      fetchAppointments();
    }
  }, [patientId, providerId, status, limit]);

  return {
    appointments,
    isLoading,
    error,
    refetch: fetchAppointments,
    cancelAppointment,
    rescheduleAppointment,
  };
}

/**
 * Hook for fetching a single appointment by ID
 */
export function useAppointment(appointmentId: string): ApiResponse<Appointment> & { 
  refetch: () => Promise<void>;
  cancelAppointment: () => Promise<boolean>;
  rescheduleAppointment: (newDate: string, newTime: string) => Promise<boolean>;
} {
  const [state, setState] = useState<ApiResponse<Appointment>>({
    data: null,
    error: null,
    loading: true,
  });

  const fetchAppointment = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // In a real app, would use the API client
      // const response = await apiClient.get<Appointment>(`/appointments/${appointmentId}`);
      
      // For now, using mock data with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const appointment = MOCK_APPOINTMENTS.find(a => a.id === appointmentId);
      
      if (!appointment) {
        throw new Error(`Appointment with ID ${appointmentId} not found`);
      }
      
      setState({
        data: appointment,
        error: null,
        loading: false,
      });
    } catch (err) {
      setState({
        data: null,
        error: err instanceof Error ? err : new Error('Failed to fetch appointment'),
        loading: false,
      });
    }
  };
  
  /**
   * Cancel this appointment
   */
  const cancelAppointment = async (): Promise<boolean> => {
    try {
      // In a real app, would call an API endpoint
      // await apiClient.put(`/appointments/${appointmentId}/cancel`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state
      setState(prev => {
        if (!prev.data) return prev;
        return {
          ...prev,
          data: { ...prev.data, status: 'cancelled' as AppointmentStatus },
        };
      });
      
      return true;
    } catch (err) {
      console.error(`Error cancelling appointment ${appointmentId}:`, err);
      return false;
    }
  };
  
  /**
   * Reschedule this appointment
   */
  const rescheduleAppointment = async (newDate: string, newTime: string): Promise<boolean> => {
    try {
      // In a real app, would call an API endpoint
      // await apiClient.put(`/appointments/${appointmentId}/reschedule`, { date: newDate, time: newTime });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state
      setState(prev => {
        if (!prev.data) return prev;
        return {
          ...prev,
          data: { 
            ...prev.data, 
            date: newDate, 
            time: newTime, 
            status: 'scheduled' as AppointmentStatus 
          },
        };
      });
      
      return true;
    } catch (err) {
      console.error(`Error rescheduling appointment ${appointmentId}:`, err);
      return false;
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [appointmentId]);

  return {
    ...state,
    refetch: fetchAppointment,
    cancelAppointment,
    rescheduleAppointment,
  };
} 