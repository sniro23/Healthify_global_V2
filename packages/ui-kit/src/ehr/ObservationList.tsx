'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../card';
import { Badge } from '../badge';
import { Button } from '../button';
import { ArrowUp, ArrowDown, AlertCircle, Check } from 'lucide-react';
import { cn } from '../utils';

interface Observation {
  id: string;
  date: string;
  name: string;
  value: string;
  unit: string;
  status: 'normal' | 'high' | 'low' | 'critical';
  referenceRange?: string;
}

interface ObservationListProps {
  observations: Observation[];
  title?: string;
  onViewDetails?: (id: string) => void;
  className?: string;
}

export function ObservationList({ observations, title = "Lab Results", onViewDetails, className }: ObservationListProps) {
  const getStatusIcon = (status: Observation['status']) => {
    switch (status) {
      case 'high':
        return <ArrowUp className="h-4 w-4 text-amber-500" />;
      case 'low':
        return <ArrowDown className="h-4 w-4 text-amber-500" />;
      case 'critical':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Check className="h-4 w-4 text-green-500" />;
    }
  };

  const getStatusVariant = (status: Observation['status']) => {
    switch (status) {
      case 'critical':
        return 'destructive';
      case 'high':
      case 'low':
        return 'warning';
      default:
        return 'success';
    }
  };

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {observations.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No results available</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-2 font-medium text-gray-500">Test</th>
                  <th className="text-left p-2 font-medium text-gray-500">Result</th>
                  <th className="text-left p-2 font-medium text-gray-500">Status</th>
                  <th className="text-left p-2 font-medium text-gray-500">Date</th>
                  {onViewDetails && <th className="text-right p-2 font-medium text-gray-500">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {observations.map((observation) => (
                  <tr key={observation.id} className="border-b border-gray-100">
                    <td className="p-2">
                      <div className="font-medium">{observation.name}</div>
                      {observation.referenceRange && (
                        <div className="text-xs text-gray-500">Ref: {observation.referenceRange}</div>
                      )}
                    </td>
                    <td className="p-2">
                      {observation.value} {observation.unit}
                    </td>
                    <td className="p-2">
                      <Badge variant={getStatusVariant(observation.status)} className="flex items-center gap-1">
                        {getStatusIcon(observation.status)}
                        <span>{observation.status}</span>
                      </Badge>
                    </td>
                    <td className="p-2">{observation.date}</td>
                    {onViewDetails && (
                      <td className="p-2 text-right">
                        <Button variant="ghost" size="sm" onClick={() => onViewDetails(observation.id)}>
                          Details
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 