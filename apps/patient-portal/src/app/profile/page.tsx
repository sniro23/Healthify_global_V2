'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { useAuth } from '../../lib/auth/AuthProvider';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Define minimal profile interfaces to avoid import dependencies
interface Profile {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  medicationAllergies?: string[];
  medicalConditions?: string[];
}

interface ProfileUpdateData {
  name?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileUpdateData>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Create a Supabase client directly
        const supabase = createClientComponentClient();
        
        if (!supabase) {
          throw new Error("Failed to initialize Supabase client");
        }
        
        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (fetchError) throw fetchError;
        
        // Ensure arrays are initialized properly
        const profileData = {
          ...data,
          medicationAllergies: data.medicationAllergies || [],
          medicalConditions: data.medicalConditions || []
        };
        
        setProfile(profileData);
        
        // Initialize form data
        setFormData({
          name: data.name,
          phone: data.phone || '',
          address: data.address || '',
          gender: data.gender || '',
          dateOfBirth: data.dateOfBirth || '',
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);
    
    try {
      // Create a Supabase client directly
      const supabase = createClientComponentClient();
      
      if (!supabase) {
        throw new Error("Failed to initialize Supabase client");
      }
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update(formData)
        .eq('id', user?.id);
        
      if (updateError) throw updateError;
      
      // Update local state
      setProfile(prev => prev ? { ...prev, ...formData } : null);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setSaveError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        
        {isLoading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-health-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-6 text-center">
            <p className="text-red-800 mb-2">Error loading profile: {error.message}</p>
            <button 
              className="px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {/* Personal Information */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
              <div className="p-6 bg-[#F3E5F5] border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-health-primary">Personal Information</h2>
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-health-primary text-white rounded-md hover:bg-[#8D4A7F]"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        setIsEditing(false);
                        // Reset form data to original profile data
                        if (profile) {
                          setFormData({
                            name: profile.name,
                            phone: profile.phone || '',
                            address: profile.address || '',
                            gender: profile.gender || '',
                            dateOfBirth: profile.dateOfBirth || '',
                          });
                        }
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                {!isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{profile?.name || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{profile?.email || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-medium">{profile?.phone || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">{profile?.address || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="font-medium">
                          {profile?.dateOfBirth 
                            ? new Date(profile.dateOfBirth).toLocaleDateString() 
                            : '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Gender</p>
                        <p className="font-medium">{profile?.gender || '-'}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {saveError && (
                      <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
                        {saveError}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-health-primary focus:border-health-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={profile?.email || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-health-primary focus:border-health-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-health-primary focus:border-health-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-health-primary focus:border-health-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Gender
                        </label>
                        <select
                          name="gender"
                          value={formData.gender || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-health-primary focus:border-health-primary"
                        >
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Non-binary">Non-binary</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-4 py-2 bg-health-primary text-white rounded-md hover:bg-[#8D4A7F] disabled:opacity-50"
                      >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
            
            {/* Medical Information */}
            {profile && ((profile.medicationAllergies && profile.medicationAllergies.length > 0) || 
                         (profile.medicalConditions && profile.medicalConditions.length > 0)) && (
              <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
                <div className="p-6 bg-[#F3E5F5] border-b">
                  <h2 className="text-xl font-semibold text-health-primary">Medical Information</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {profile.medicationAllergies && profile.medicationAllergies.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium mb-2">Medication Allergies</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          {profile.medicationAllergies.map((allergy, index) => (
                            <li key={index}>{allergy}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {profile.medicalConditions && profile.medicalConditions.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium mb-2">Medical Conditions</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          {profile.medicalConditions.map((condition, index) => (
                            <li key={index}>{condition}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
} 