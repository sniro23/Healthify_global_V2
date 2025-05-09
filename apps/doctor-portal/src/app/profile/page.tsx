'use client';

import { DoctorProfileForm } from '@/components/profile/DoctorProfileForm';

export default function DoctorProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Doctor Profile</h1>
        <DoctorProfileForm />
      </div>
    </div>
  );
} 