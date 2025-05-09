'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BookAppointment } from '@/components/appointments/BookAppointment';

export default function NewAppointmentPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/appointments');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="container mx-auto py-8">
      <BookAppointment
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
} 