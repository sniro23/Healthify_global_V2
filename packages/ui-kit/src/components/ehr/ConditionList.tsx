'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Heart, Calendar } from 'lucide-react';
import type { Condition } from '@healthify/fhir-types';

interface ConditionListProps {
  conditions: Condition[];
  title?: string;
  onViewDetails?: (id: string) => void;
}

export function ConditionList({ conditions, title = "Conditions", onViewDetails }: ConditionListProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getConditionName = (condition: Condition): string => {
    return condition.code?.text || condition.code?.coding?.[0]?.display || 'Unknown Condition';
  };

  const getVerificationStatus = (condition: Condition): string => {
    return condition.verificationStatus?.coding?.[0]?.code || 'unknown';
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
        {conditions.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No conditions on record</div>
        ) : (
          <div className="space-y-4">
            {conditions.map((condition) => (
              <div 
                key={condition.id} 
                className="p-4 border border-gray-200 rounded-md"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-health-primary" />
                    <span className="font-medium">{getConditionName(condition)}</span>
                  </div>
                  <Badge className={getStatusColor(condition.clinicalStatus?.coding?.[0]?.code)}>
                    {condition.clinicalStatus?.coding?.[0]?.code || 'Unknown Status'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mt-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Verification:</span>
                    <span>{getVerificationStatus(condition)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>
                      Onset: {formatDate(condition.onsetDateTime)}
                    </span>
                  </div>
                </div>
                
                {onViewDetails && (
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => onViewDetails(condition.id || '')}>
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