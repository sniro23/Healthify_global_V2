'use client';

import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// @ts-expect-error: The ui-kit package exists in the workspace but TS can't find it
import { Button, Card, Badge } from '@healthify/ui-kit';

interface DoctorProfile {
  id: string;
  user_id: string;
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  specialties: string[];
  license_number: string;
  license_state: string;
  accepting_new_patients: boolean;
  created_at: string;
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const fetchDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from('doctor_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDoctors(data || []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      // toast.error('Failed to fetch doctors');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyDoctor = async (doctorId: string) => {
    try {
      const { error } = await supabase
        .from('doctor_profiles')
        .update({ verified: true })
        .eq('id', doctorId);

      if (error) throw error;
      
      // Refresh the doctors list
      fetchDoctors();
      // toast.success('Doctor verified successfully');
    } catch (error) {
      console.error('Error verifying doctor:', error);
      // toast.error('Failed to verify doctor');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Doctor Profiles</h1>
        <Button>Export List</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">
                  {doctor.title} {doctor.first_name} {doctor.last_name}
                </h3>
                <p className="text-gray-600">{doctor.email}</p>
              </div>
              <Badge
                variant={doctor.accepting_new_patients ? 'success' : 'warning'}
              >
                {doctor.accepting_new_patients ? 'Accepting Patients' : 'Not Accepting'}
              </Badge>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-medium">License:</span>{' '}
                {doctor.license_number} ({doctor.license_state})
              </p>
              <div>
                <span className="font-medium">Specialties:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {doctor.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => window.location.href = `/doctors/${doctor.id}`}
              >
                View Details
              </Button>
              <Button
                onClick={() => handleVerifyDoctor(doctor.id)}
              >
                Verify
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 