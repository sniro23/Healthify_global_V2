'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../card';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar';
import { cn } from '../utils';

interface PatientSummaryProps {
  patient: {
    id: string;
    name: string;
    age: number;
    gender: string;
    dateOfBirth: string;
    address?: string;
    phone?: string;
    email?: string;
    avatar?: string;
    bloodType?: string;
  };
  vitals?: {
    height?: string;
    weight?: string;
    bmi?: string;
    bloodPressure?: string;
    heartRate?: string;
    temperature?: string;
  };
  className?: string;
}

export function PatientSummary({ patient, vitals, className }: PatientSummaryProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          {patient.avatar && <AvatarImage src={patient.avatar} alt={patient.name} />}
          <AvatarFallback>{patient.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl">{patient.name}</CardTitle>
          <p className="text-sm text-gray-500">
            {patient.age} years • {patient.gender} • DOB: {patient.dateOfBirth}
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Contact</h4>
          {patient.phone && <p className="text-sm mb-1">{patient.phone}</p>}
          {patient.email && <p className="text-sm mb-1">{patient.email}</p>}
          {patient.address && <p className="text-sm">{patient.address}</p>}
        </div>
        {vitals && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Vital Signs</h4>
            {vitals.height && <p className="text-sm mb-1">Height: {vitals.height}</p>}
            {vitals.weight && <p className="text-sm mb-1">Weight: {vitals.weight}</p>}
            {vitals.bmi && <p className="text-sm mb-1">BMI: {vitals.bmi}</p>}
            {vitals.bloodPressure && <p className="text-sm mb-1">BP: {vitals.bloodPressure}</p>}
            {vitals.heartRate && <p className="text-sm mb-1">HR: {vitals.heartRate}</p>}
            {vitals.temperature && <p className="text-sm">Temp: {vitals.temperature}</p>}
          </div>
        )}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Other Info</h4>
          {patient.bloodType && <p className="text-sm mb-1">Blood Type: {patient.bloodType}</p>}
        </div>
      </CardContent>
    </Card>
  );
} 