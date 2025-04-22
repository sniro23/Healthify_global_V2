
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/packages/ui-kit";
import { Calendar } from "lucide-react";

interface RecordCardProps {
  record: {
    id: string;
    title: string;
    date: string;
    description: string;
  };
}

const RecordCard: React.FC<RecordCardProps> = ({ record }) => (
  <Card className="w-full hover:shadow-lg transition-shadow animate-fade-in">
    <CardHeader className="flex flex-row gap-3 items-baseline border-none">
      <CardTitle className="text-base">{record.title}</CardTitle>
      <span className="flex items-center text-sm text-gray-500 gap-1">
        <Calendar className="h-4 w-4" />
        {record.date}
      </span>
    </CardHeader>
    <CardContent className="text-gray-700">{record.description}</CardContent>
  </Card>
);

export default RecordCard;
