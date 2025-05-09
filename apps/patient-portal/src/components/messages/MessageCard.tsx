'use client';

import React from 'react';
import { Card, CardContent } from '@healthify/ui-kit';

interface MessageCardProps {
  message: {
    id: string;
    from: string;
    date: string;
    preview: string;
    unread: boolean;
  };
  active: boolean;
}

export default function MessageCard({ message, active }: MessageCardProps) {
  return (
    <Card className={`cursor-pointer transition-colors ${active ? 'bg-health-primary/5 border-health-primary' : 'hover:bg-gray-50'}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`font-medium ${message.unread ? 'text-health-primary' : 'text-gray-900'}`}>
            {message.from}
          </h3>
          <span className="text-sm text-gray-500">{message.date}</span>
        </div>
        <p className={`text-sm ${message.unread ? 'font-medium text-gray-900' : 'text-gray-600'} line-clamp-2`}>
          {message.preview}
        </p>
        {message.unread && (
          <div className="mt-2">
            <span className="inline-block w-2 h-2 bg-health-primary rounded-full" />
          </div>
        )}
      </CardContent>
    </Card>
  );
} 