
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@/components/ui";
import { FileText, Heart } from "lucide-react";

interface HealthRecord {
  id: string;
  title: string;
  date: string;
  doctor: string;
  category: string;
  status: "normal" | "attention" | "critical";
}

const mockRecords: HealthRecord[] = [
  {
    id: "1",
    title: "Annual Physical Examination",
    date: "April 10, 2025",
    doctor: "Dr. Jane Smith",
    category: "Physical Examination",
    status: "normal"
  },
  {
    id: "2",
    title: "Blood Work Panel",
    date: "March 15, 2025",
    doctor: "Dr. David Chen",
    category: "Laboratory",
    status: "attention"
  },
  {
    id: "3",
    title: "Cardiology Consultation",
    date: "February 22, 2025",
    doctor: "Dr. Sarah Johnson",
    category: "Cardiology",
    status: "normal"
  }
];

const statusStyles = {
  normal: "bg-[var(--health-success)] text-green-800",
  attention: "bg-[var(--health-warning)] text-amber-800",
  critical: "bg-[var(--health-error)] text-red-800"
};

export function HealthRecords() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Heart className="h-6 w-6 text-health-primary" />
          Health Records
        </h2>
        <div>
          <Button variant="outline" size="sm" className="mr-2">
            Filter
          </Button>
          <Button variant="health" size="sm">
            Request Records
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {mockRecords.map((record) => (
          <Card key={record.id} className="overflow-hidden">
            <CardHeader className="bg-health-highlight">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-health-primary mr-2" />
                  <CardTitle className="text-lg">{record.title}</CardTitle>
                </div>
                <Badge className={statusStyles[record.status]}>
                  {record.status === "normal" ? "Normal" : 
                   record.status === "attention" ? "Needs Attention" : "Critical"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{record.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Doctor</p>
                  <p className="font-medium">{record.doctor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{record.category}</p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="mr-2">
                  View Details
                </Button>
                <Button variant="ghost" size="sm">
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
