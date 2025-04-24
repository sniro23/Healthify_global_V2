import React from 'react';
import { Badge } from '@healthify/ui-kit';

interface Message {
  id: string;
  from: string;
  date: string;
  preview: string;
  unread: boolean;
}

interface MessageCardProps {
  message: Message;
  active: boolean;
}

export default function MessageCard({ message, active }: MessageCardProps) {
  return (
    <div 
      className={`p-4 rounded-md cursor-pointer transition-colors ${
        active 
          ? 'bg-health-highlight border-l-4 border-health-primary'
          : 'bg-white hover:bg-gray-50 border border-gray-200'
      }`}
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-medium">{message.from}</h3>
        <span className="text-xs text-gray-500">{message.date}</span>
      </div>
      
      <p className={`text-sm ${message.unread ? 'font-medium' : 'text-gray-600'}`}>
        {message.preview.length > 60 
          ? `${message.preview.substring(0, 60)}...` 
          : message.preview
        }
      </p>
      
      {message.unread && (
        <div className="flex justify-end mt-2">
          <Badge className="bg-health-primary">New</Badge>
        </div>
      )}
    </div>
  );
} 