'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useAuth } from '@healthify/ui-kit';

// @ts-ignore: The ui-kit package exists in the workspace but TS can't find it
import { Button, Input, Select, Textarea, Label, FormItem, FormControl, FormMessage } from '@healthify/ui-kit';

const doctorProfileSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  specialties: z.array(z.string()).min(1, 'At least one specialty is required'),
  licenseNumber: z.string().min(5, 'License number is required'),
  licenseState: z.string().min(2, 'License state is required'),
  npiNumber: z.string().min(10, 'NPI number is required'),
  boardCertifications: z.array(z.string()),
  education: z.array(z.object({
    institution: z.string(),
    degree: z.string(),
    year: z.number()
  })),
  bio: z.string().min(50, 'Bio should be at least 50 characters'),
  languages: z.array(z.string()),
  acceptingNewPatients: z.boolean()
});

type DoctorProfileFormData = z.infer<typeof doctorProfileSchema>;

export function DoctorProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<DoctorProfileFormData>({
    resolver: zodResolver(doctorProfileSchema)
  });

  const onSubmit = async (data: DoctorProfileFormData) => {
    setIsLoading(true);
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('doctor_profiles')
        .upsert({
          user_id: user.id,
          ...data,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      // Show success message
      // toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      // toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Select
            label="Title"
            options={[
              { value: 'Dr.', label: 'Dr.' },
              { value: 'Prof.', label: 'Prof.' },
              { value: 'Mr.', label: 'Mr.' },
              { value: 'Mrs.', label: 'Mrs.' },
              { value: 'Ms.', label: 'Ms.' }
            ]}
            error={errors.title?.message}
            {...register('title')}
          />
        </div>
        <FormItem>
          <Label htmlFor="firstName">First Name</Label>
          <FormControl>
            <Input
              id="firstName"
              {...register('firstName')}
            />
          </FormControl>
          {errors.firstName && <FormMessage>{errors.firstName.message}</FormMessage>}
        </FormItem>
        
        <FormItem>
          <Label htmlFor="lastName">Last Name</Label>
          <FormControl>
            <Input
              id="lastName"
              {...register('lastName')}
            />
          </FormControl>
          {errors.lastName && <FormMessage>{errors.lastName.message}</FormMessage>}
        </FormItem>
        
        <FormItem>
          <Label htmlFor="email">Email</Label>
          <FormControl>
            <Input
              id="email"
              type="email"
              {...register('email')}
            />
          </FormControl>
          {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
        </FormItem>
        
        <FormItem>
          <Label htmlFor="phone">Phone</Label>
          <FormControl>
            <Input
              id="phone"
              type="tel"
              {...register('phone')}
            />
          </FormControl>
          {errors.phone && <FormMessage>{errors.phone.message}</FormMessage>}
        </FormItem>
        
        <FormItem>
          <Label htmlFor="licenseNumber">License Number</Label>
          <FormControl>
            <Input
              id="licenseNumber"
              {...register('licenseNumber')}
            />
          </FormControl>
          {errors.licenseNumber && <FormMessage>{errors.licenseNumber.message}</FormMessage>}
        </FormItem>
        
        <FormItem>
          <Label htmlFor="licenseState">License State</Label>
          <FormControl>
            <Input
              id="licenseState"
              {...register('licenseState')}
            />
          </FormControl>
          {errors.licenseState && <FormMessage>{errors.licenseState.message}</FormMessage>}
        </FormItem>
        
        <FormItem>
          <Label htmlFor="npiNumber">NPI Number</Label>
          <FormControl>
            <Input
              id="npiNumber"
              {...register('npiNumber')}
            />
          </FormControl>
          {errors.npiNumber && <FormMessage>{errors.npiNumber.message}</FormMessage>}
        </FormItem>
      </div>

      <div>
        <Select
          label="Specialties"
          isMulti
          options={[
            { value: 'cardiology', label: 'Cardiology' },
            { value: 'dermatology', label: 'Dermatology' },
            { value: 'endocrinology', label: 'Endocrinology' },
            { value: 'gastroenterology', label: 'Gastroenterology' },
            { value: 'neurology', label: 'Neurology' },
            { value: 'oncology', label: 'Oncology' },
            { value: 'pediatrics', label: 'Pediatrics' },
            { value: 'psychiatry', label: 'Psychiatry' },
            { value: 'surgery', label: 'Surgery' }
          ]}
          error={errors.specialties?.message}
          {...register('specialties')}
        />
      </div>

      <div>
        <Select
          label="Languages"
          isMulti
          options={[
            { value: 'english', label: 'English' },
            { value: 'spanish', label: 'Spanish' },
            { value: 'french', label: 'French' },
            { value: 'mandarin', label: 'Mandarin' },
            { value: 'arabic', label: 'Arabic' }
          ]}
          error={errors.languages?.message}
          {...register('languages')}
        />
      </div>

      <div>
        <Textarea
          label="Professional Bio"
          error={errors.bio?.message}
          {...register('bio')}
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...register('acceptingNewPatients')}
          className="h-4 w-4 rounded border-gray-300"
        />
        <label className="text-sm font-medium text-gray-700">
          Currently accepting new patients
        </label>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
          className={isLoading ? 'opacity-50' : ''}
        >
          {isLoading ? 'Saving...' : 'Save Profile'}
        </Button>
      </div>
    </form>
  );
} 