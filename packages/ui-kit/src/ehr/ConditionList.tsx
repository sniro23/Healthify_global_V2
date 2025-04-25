'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../card';
import { Badge } from '../badge';
import { cn } from '../utils';

interface Condition {
  id: string;
  name: string;
  status: 'active' | 'resolved' | 'inactive';
  onsetDate?: string;
  endDate?: string;
  severity?: 'mild' | 'moderate' | 'severe';
  notes?: string;
}

interface ConditionListProps {
  conditions: Condition[];
  title?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export function ConditionList({ conditions, title = "Medical Conditions", onSelect, className }: ConditionListProps) {
  const getSeverityColor = (severity?: Condition['severity']) => {
    switch (severity) {
      case 'mild':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-amber-100 text-amber-800';
      case 'severe':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Condition['status']) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
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
        {conditions.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No conditions recorded</div>
        ) : (
          <div className="space-y-3">
            {conditions.map((condition) => (
              <div 
                key={condition.id} 
                className={`p-3 border border-gray-200 rounded-md hover:bg-gray-50 ${onSelect ? 'cursor-pointer' : ''}`}
                onClick={() => onSelect && onSelect(condition.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="font-medium">{condition.name}</div>
                  <div className="flex gap-2">
                    {condition.severity && (
                      <Badge className={getSeverityColor(condition.severity)}>
                        {condition.severity}
                      </Badge>
                    )}
                    <Badge className={getStatusColor(condition.status)}>
                      {condition.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500 mt-1">
                  {condition.onsetDate && (
                    <span>Onset: {condition.onsetDate} </span>
                  )}
                  {condition.endDate && (
                    <span>• Resolved: {condition.endDate}</span>
                  )}
                </div>
                
                {condition.notes && (
                  <div className="text-sm mt-2 text-gray-700">{condition.notes}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 