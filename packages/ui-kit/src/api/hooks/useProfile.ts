'use client';

import { useState, useEffect } from 'react';
import apiClient, { ApiResponse } from '../client';
import { useAuth } from '../../auth-module';

// User profile type definition
export interface Profile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    groupNumber?: string;
  };
  medicationAllergies?: string[];
  medicalConditions?: string[];
  createdAt: string;
  updatedAt: string;
}

// Profile update data
export type ProfileUpdateData = Partial<Omit<Profile, 'id' | 'email' | 'createdAt' | 'updatedAt'>>;

/**
 * Hook for fetching and managing user profile
 * @returns Profile data, loading state, error state, and update methods
 */
export function useProfile(): {
  profile: Profile | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  updateProfile: (data: ProfileUpdateData) => Promise<boolean>;
} {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Mock profile data - in production this would come from the API
  const mockProfile: Profile = {
    id: user?.id || 'user123',
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, CA 94000',
    dateOfBirth: '1988-04-15',
    gender: 'Male',
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '(555) 987-6543'
    },
    insuranceInfo: {
      provider: 'HealthPlus Insurance',
      policyNumber: 'HP1234567890',
      groupNumber: 'GP9876543'
    },
    medicationAllergies: ['Penicillin', 'Sulfa drugs'],
    medicalConditions: ['Hypertension', 'Asthma'],
    createdAt: '2023-01-15T08:30:00Z',
    updatedAt: '2024-05-01T14:45:00Z'
  };

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      
      // In a real app, would use the API client to fetch data
      // const response = await apiClient.get<Profile>(`/profile`);
      
      // For now, using mock data with a delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Set profile data
      setProfile(mockProfile);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch profile'));
      console.error('Error fetching profile:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Update user profile
   * @param data Updated profile data
   * @returns Boolean indicating success
   */
  const updateProfile = async (data: ProfileUpdateData): Promise<boolean> => {
    try {
      // In a real app, would call an API endpoint
      // await apiClient.put('/profile', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Update local state
      setProfile(prev => {
        if (!prev) return null;
        return {
          ...prev,
          ...data,
          updatedAt: new Date().toISOString(),
        };
      });
      
      return true;
    } catch (err) {
      console.error('Error updating profile:', err);
      return false;
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user?.id]);

  return {
    profile,
    isLoading,
    error,
    refetch: fetchProfile,
    updateProfile,
  };
} 