'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../card';
import { Badge } from '../badge';
import { Button } from '../button';
import { Pill, Clock, Calendar } from 'lucide-react';
import { cn } from '../utils';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  route: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'stopped';
  instructions?: string;
}

interface MedicationListProps {
  medications: Medication[];
  title?: string;
  onViewDetails?: (id: string) => void;
  className?: string;
}

export function MedicationList({ medications, title = "Medications", onViewDetails, className }: MedicationListProps) {
  const getStatusColor = (status: Medication['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'stopped':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {medications.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No medications on record</div>
        ) : (
          <div className="space-y-4">
            {medications.map((med) => (
              <div 
                key={med.id} 
                className="p-4 border border-gray-200 rounded-md"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Pill className="h-5 w-5 text-health-primary" />
                    <span className="font-medium">{med.name}</span>
                  </div>
                  <Badge className={getStatusColor(med.status)}>
                    {med.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mt-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Dosage:</span>
                    <span>{med.dosage}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{med.frequency}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Route:</span>
                    <span>{med.route}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>
                      Started: {med.startDate}
                      {med.endDate && ` • Until: ${med.endDate}`}
                    </span>
                  </div>
                </div>
                
                {med.instructions && (
                  <div className="mt-3 text-sm">
                    <span className="text-gray-500">Instructions:</span>
                    <p className="mt-1">{med.instructions}</p>
                  </div>
                )}
                
                {onViewDetails && (
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => onViewDetails(med.id)}>
                      View Details
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 