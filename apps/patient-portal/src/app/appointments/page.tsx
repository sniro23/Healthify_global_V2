'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { useAuth } from '../../lib/auth/AuthProvider';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Define minimal Appointment interface
interface Appointment {
  id: string;
  patient_id: string;
  practitioner_id: string;
  start_time: string;
  end_time: string;
  status: string;
  reason?: string;
  notes?: string;
}

export default function AppointmentsPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Create a Supabase client directly without relying on window.supabase
        const supabase = createClientComponentClient();
        
        if (!supabase) {
          throw new Error("Failed to initialize Supabase client");
        }
        
        const { data, error: fetchError } = await supabase
          .from('appointments')
          .select('*')
          .eq('patient_id', user.id)
          .order('start_time', { ascending: true });
          
        if (fetchError) throw fetchError;
        
        setAppointments(data || []);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  const handleCancel = async (appointmentId: string) => {
    try {
      // Create a Supabase client directly
      const supabase = createClientComponentClient();
      
      if (!supabase) {
        throw new Error("Failed to initialize Supabase client");
      }
      
      const { error: cancelError } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', appointmentId);
        
      if (cancelError) throw cancelError;
      
      // Update local state
      setAppointments(prevAppointments => 
        prevAppointments.map(appt => 
          appt.id === appointmentId ? { ...appt, status: 'cancelled' } : appt
        )
      );
    } catch (error) {
      console.error('Failed to cancel appointment:', error);
      alert('Failed to cancel appointment. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Appointments</h1>
          <button 
            className="px-4 py-2 bg-health-primary text-white rounded-md hover:bg-[#8D4A7F]"
            onClick={() => window.location.href = '/book-appointment'}
          >
            Book New Appointment
          </button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-health-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-6 text-center">
            <p className="text-red-800 mb-2">Error loading appointments: {error.message}</p>
            <button 
              className="px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center">
            <p className="text-gray-700 mb-4">You don't have any appointments scheduled.</p>
            <button 
              className="px-4 py-2 bg-health-primary text-white rounded-md hover:bg-[#8D4A7F]"
              onClick={() => window.location.href = '/book-appointment'}
            >
              Book Your First Appointment
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {appointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
                  appointment.status === 'booked' 
                    ? 'border-green-500' 
                    : appointment.status === 'cancelled' 
                    ? 'border-red-500' 
                    : appointment.status === 'completed' 
                    ? 'border-blue-500' 
                    : 'border-gray-500'
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold mb-1">
                        {formatDate(appointment.start_time)}
                      </h2>
                      <p className="text-gray-600">
                        {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      appointment.status === 'booked' 
                        ? 'bg-green-100 text-green-800' 
                        : appointment.status === 'cancelled' 
                        ? 'bg-red-100 text-red-800' 
                        : appointment.status === 'completed' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                  
                  {appointment.reason && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Reason for Visit</p>
                      <p className="text-gray-800">{appointment.reason}</p>
                    </div>
                  )}
                  
                  {appointment.notes && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Notes</p>
                      <p className="text-gray-800">{appointment.notes}</p>
                    </div>
                  )}
                  
                  {appointment.status === 'booked' && (
                    <div className="mt-4">
                      <button
                        onClick={() => handleCancel(appointment.id)}
                        className="px-4 py-2 bg-red-50 text-red-700 border border-red-300 rounded-md hover:bg-red-100"
                      >
                        Cancel Appointment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
} 