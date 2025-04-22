
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/packages/ui-kit";
import { User, Calendar } from "lucide-react";

interface PrescriptionCardProps {
  prescription: {
    id: string;
    medication: string;
    dosage: string;
    doctor: string;
    status: string;
    refillDue: string | null;
  };
}
const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Expired: "bg-gray-100 text-gray-500",
};

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({ prescription }) => (
  <Card className="w-full hover:shadow-lg transition-shadow animate-fade-in">
    <CardHeader className="flex flex-col sm:flex-row justify-between gap-2">
      <div>
        <CardTitle className="text-base">{prescription.medication}</CardTitle>
        <div className="text-sm text-gray-600">{prescription.dosage}</div>
      </div>
      <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[prescription.status] || "bg-gray-100 text-gray-500"}`}>
        {prescription.status}
      </span>
    </CardHeader>
    <CardContent className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm">
        <User className="h-4 w-4 text-health-primary" />
        <span>{prescription.doctor}</span>
      </div>
      {prescription.refillDue && (
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-health-primary" />
          <span>Refill Due: {prescription.refillDue}</span>
        </div>
      )}
    </CardContent>
  </Card>
);

export default PrescriptionCard;
