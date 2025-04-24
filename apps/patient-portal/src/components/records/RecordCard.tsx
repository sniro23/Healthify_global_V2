import React from 'react';
import { FileText, Calendar, ExternalLink } from 'lucide-react';

interface HealthRecord {
  id: string;
  title: string;
  date: string;
  description: string;
}

interface RecordCardProps {
  record: HealthRecord;
}

export default function RecordCard({ record }: RecordCardProps) {
  return (
    <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <FileText className="h-5 w-5 text-health-primary" />
          </div>
          <div>
            <h3 className="font-medium">{record.title}</h3>
            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{record.date}</span>
            </div>
            <p className="mt-2 text-sm">{record.description}</p>
          </div>
        </div>
        <button className="text-health-primary hover:text-health-primary/80">
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 