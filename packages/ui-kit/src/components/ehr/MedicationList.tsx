'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Pill, Clock, Calendar } from 'lucide-react';
import type { MedicationRequest } from '@healthify/fhir-types';

interface MedicationListProps {
  medications: MedicationRequest[];
  title?: string;
  onViewDetails?: (id: string) => void;
}

export function MedicationList({ medications, title = "Medications", onViewDetails }: MedicationListProps) {
  const getStatusColor = (status: MedicationRequest['status']) => {
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

  const getMedicationName = (med: MedicationRequest): string => {
    if (med.medicationCodeableConcept?.text) {
      return med.medicationCodeableConcept.text;
    }
    return med.medicationCodeableConcept?.coding?.[0]?.display || 'Unknown Medication';
  };

  const getDosageInstructions = (med: MedicationRequest): string => {
    return med.dosageInstruction?.[0]?.text || 'No dosage instructions available';
  };

  const getFrequency = (med: MedicationRequest): string => {
    const timing = med.dosageInstruction?.[0]?.timing;
    if (!timing) return 'As needed';
    const repeat = timing.repeat;
    if (!repeat) return 'As needed';

    if (repeat.frequency && repeat.period) {
      return `${repeat.frequency} times per ${repeat.periodUnit?.toLowerCase() || 'day'}`;
    }
    return timing.code?.text || 'As needed';
  };

  return (
    <Card>
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
                    <span className="font-medium">{getMedicationName(med)}</span>
                  </div>
                  <Badge className={getStatusColor(med.status)}>
                    {med.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mt-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Instructions:</span>
                    <span>{getDosageInstructions(med)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{getFrequency(med)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>
                      Authored: {med.authoredOn || 'Unknown'}
                    </span>
                  </div>
                </div>
                
                {onViewDetails && (
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => onViewDetails(med.id || '')}>
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