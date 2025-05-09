'use client';

import * as React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
import { Avatar } from '../ui/avatar';
import { Calendar, Heart, User, Stethoscope, Phone } from 'lucide-react';
import type { Patient } from '@healthify/fhir-types';

export interface PatientSummaryProps {
  patient: Patient;
  className?: string;
}

export const PatientSummary: React.FC<PatientSummaryProps> = ({ 
  patient, 
  className = '',
  ...props 
}) => {
  const patientName = patient.name?.[0]?.text || 
    [patient.name?.[0]?.given?.join(' '), patient.name?.[0]?.family].filter(Boolean).join(' ') ||
    'Unknown Patient';

  const patientPhone = patient.telecom?.find(t => t.system === 'phone')?.value;
  const patientEmail = patient.telecom?.find(t => t.system === 'email')?.value;
  const patientAddress = patient.address?.[0]?.text || 
    [
      patient.address?.[0]?.line?.join(' '),
      patient.address?.[0]?.city,
      patient.address?.[0]?.state,
      patient.address?.[0]?.postalCode
    ].filter(Boolean).join(', ');

  return (
    <Card className={`patient-summary ${className}`} {...props}>
      <CardHeader className="flex flex-row items-start gap-4">
        <Avatar 
          fallback={patientName.charAt(0)}
          size="lg" 
        />
        <div>
          <CardTitle>{patientName}</CardTitle>
          <p className="text-sm text-gray-500">
            {patient.gender && patient.birthDate ? 
              `${patient.gender}, ${patient.birthDate}` : 
              patient.birthDate || patient.gender || ''}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 text-sm">
          {patientEmail && (
            <div className="flex">
              <span className="w-20 font-medium text-gray-500">Email:</span>
              <span>{patientEmail}</span>
            </div>
          )}
          {patientPhone && (
            <div className="flex">
              <span className="w-20 font-medium text-gray-500">Phone:</span>
              <span>{patientPhone}</span>
            </div>
          )}
          {patientAddress && (
            <div className="flex">
              <span className="w-20 font-medium text-gray-500">Address:</span>
              <span>{patientAddress}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}; 