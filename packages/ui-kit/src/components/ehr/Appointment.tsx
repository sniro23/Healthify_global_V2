'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';
import { Calendar, Clock, User, MapPin, Video, Phone } from 'lucide-react';

export interface AppointmentProps {
  id: string;
  patientName?: string;
  doctorName?: string;
  date: string;
  time: string;
  type: 'Video' | 'Phone' | 'In-Person';
  status: 'booked' | 'pending' | 'arrived' | 'fulfilled' | 'cancelled';
  description?: string;
}

export function Appointment({ 
  patientName,
  doctorName,
  date,
  time,
  type,
  status,
  description 
}: AppointmentProps) {
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'booked':
        return { label: 'Confirmed', color: 'bg-green-100 text-green-800' };
      case 'pending':
        return { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' };
      case 'arrived':
        return { label: 'Arrived', color: 'bg-blue-100 text-blue-800' };
      case 'fulfilled':
        return { label: 'Completed', color: 'bg-gray-100 text-gray-800' };
      case 'cancelled':
        return { label: 'Cancelled', color: 'bg-red-100 text-red-800' };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'Video':
        return <Video className="h-4 w-4" />;
      case 'Phone':
        return <Phone className="h-4 w-4" />;
      case 'In-Person':
        return <MapPin className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const statusInfo = getStatusDisplay(status);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center justify-between">
          <div className="flex items-center gap-2">
            {patientName && (
              <>
                <User className="h-4 w-4 text-health-primary" />
                <span>{patientName}</span>
              </>
            )}
            {doctorName && (
              <>
                <User className="h-4 w-4 text-health-primary" />
                <span>Dr. {doctorName}</span>
              </>
            )}
          </div>
          <span className={`px-2 py-1 rounded-full text-xs ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {getTypeIcon()}
            <span>{type} Appointment</span>
          </div>
          {description && (
            <p className="text-sm text-gray-600 mt-2">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 