'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// @ts-expect-error: The ui-kit package exists in the workspace but TS can't find it
import { Button, Card, Badge, Tabs, TabsContent, TabsList, TabsTrigger } from '@healthify/ui-kit';

interface DoctorProfile {
  id: string;
  user_id: string;
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  specialties: string[];
  license_number: string;
  license_state: string;
  npi_number: string;
  board_certifications: string[];
  education: Array<{
    institution: string;
    degree: string;
    year: number;
  }>;
  bio: string;
  languages: string[];
  accepting_new_patients: boolean;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export default function DoctorDetailsPage() {
  const params = useParams();
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  useEffect(() => {
    fetchDoctorDetails();
  }, [fetchDoctorDetails]);

  const fetchDoctorDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('doctor_profiles')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;
      setDoctor(data);
    } catch (error) {
      console.error('Error fetching doctor details:', error);
      // toast.error('Failed to fetch doctor details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyDoctor = async () => {
    if (!doctor) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('doctor_profiles')
        .update({ verified: true })
        .eq('id', doctor.id);

      if (error) throw error;
      
      setDoctor({ ...doctor, verified: true });
      // toast.success('Doctor verified successfully');
    } catch (error) {
      console.error('Error verifying doctor:', error);
      // toast.error('Failed to verify doctor');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Doctor not found</h2>
          <p className="mt-2 text-gray-600">The requested doctor profile does not exist.</p>
          <Button
            className="mt-4"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            {doctor.title} {doctor.first_name} {doctor.last_name}
          </h1>
          <p className="text-gray-600 mt-1">{doctor.email}</p>
        </div>
        <div className="flex space-x-4">
          <Badge variant={doctor.verified ? 'success' : 'warning'}>
            {doctor.verified ? 'Verified' : 'Pending Verification'}
          </Badge>
          {!doctor.verified && (
            <Button
              onClick={handleVerifyDoctor}
              disabled={isUpdating}
            >
              {isUpdating ? 'Verifying...' : 'Verify Doctor'}
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="credentials">Credentials</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                <p><span className="font-medium">Phone:</span> {doctor.phone}</p>
                <p><span className="font-medium">Email:</span> {doctor.email}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Practice Status</h3>
                <p>
                  <span className="font-medium">Accepting New Patients:</span>{' '}
                  {doctor.accepting_new_patients ? 'Yes' : 'No'}
                </p>
                <p>
                  <span className="font-medium">Languages:</span>{' '}
                  {doctor.languages.join(', ')}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Professional Bio</h3>
              <p className="text-gray-700">{doctor.bio}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.specialties.map((specialty) => (
                  <Badge key={specialty} variant="outline">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="credentials">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">License Information</h3>
                <p><span className="font-medium">License Number:</span> {doctor.license_number}</p>
                <p><span className="font-medium">State:</span> {doctor.license_state}</p>
                <p><span className="font-medium">NPI Number:</span> {doctor.npi_number}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Board Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.board_certifications.map((cert) => (
                    <Badge key={cert} variant="outline">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Education</h3>
                <div className="space-y-3">
                  {doctor.education.map((edu, index) => (
                    <div key={index} className="border-b pb-2">
                      <p className="font-medium">{edu.institution}</p>
                      <p className="text-gray-600">{edu.degree}, {edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Account Activity</h3>
                <p><span className="font-medium">Created:</span> {new Date(doctor.created_at).toLocaleDateString()}</p>
                <p><span className="font-medium">Last Updated:</span> {new Date(doctor.updated_at).toLocaleDateString()}</p>
              </div>
              
              {/* Add more activity information as needed */}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 