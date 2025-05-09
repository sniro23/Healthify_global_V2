'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Activity, Calendar } from 'lucide-react';
import type { Observation } from '@healthify/fhir-types';

interface ObservationListProps {
  observations: Observation[];
  title?: string;
  onViewDetails?: (id: string) => void;
}

export function ObservationList({ observations, title = "Observations", onViewDetails }: ObservationListProps) {
  const getStatusColor = (status: Observation['status']) => {
    switch (status) {
      case 'final':
        return 'bg-green-100 text-green-800';
      case 'preliminary':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getObservationName = (obs: Observation): string => {
    return obs.code?.text || obs.code?.coding?.[0]?.display || 'Unknown Observation';
  };

  const getObservationValue = (obs: Observation): string => {
    if (obs.valueQuantity) {
      return `${obs.valueQuantity.value} ${obs.valueQuantity.unit || ''}`;
    }
    if (obs.valueString) {
      return obs.valueString;
    }
    if (obs.valueCodeableConcept?.text) {
      return obs.valueCodeableConcept.text;
    }
    return 'No value recorded';
  };

  const formatDate = (date?: string): string => {
    if (!date) return 'Unknown date';
    return new Date(date).toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {observations.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No observations on record</div>
        ) : (
          <div className="space-y-4">
            {observations.map((obs) => (
              <div 
                key={obs.id} 
                className="p-4 border border-gray-200 rounded-md"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-health-primary" />
                    <span className="font-medium">{getObservationName(obs)}</span>
                  </div>
                  <Badge className={getStatusColor(obs.status)}>
                    {obs.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mt-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Value:</span>
                    <span>{getObservationValue(obs)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>
                      Effective: {formatDate(obs.effectiveDateTime)}
                    </span>
                  </div>
                </div>
                
                {onViewDetails && (
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => onViewDetails(obs.id || '')}>
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