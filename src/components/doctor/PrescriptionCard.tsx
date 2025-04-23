
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";
import { Prescription } from "@/types/prescription";

interface PrescriptionCardProps {
  prescription: Prescription;
}

export const PrescriptionCard = ({ prescription }: PrescriptionCardProps) => {
  const statusMap = {
    active: { class: "bg-green-50 text-green-700 border-green-100", label: "Active" },
    expired: { class: "bg-gray-50 text-gray-600 border-gray-100", label: "Expired" },
    pending: { class: "bg-yellow-50 text-yellow-700 border-yellow-100", label: "Refill Needed" }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col md:flex-row">
            <div className="bg-gray-50 p-4 md:w-48 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-start">
              <div className="flex items-center mb-0 md:mb-2">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">Issued: {prescription.issueDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">Expires: {prescription.expiryDate}</span>
              </div>
            </div>
            <div className="p-4 flex-1">
              <div className="flex items-center mb-2">
                <Avatar className="h-10 w-10 mr-3">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-health-primary">
                    {prescription.patientName.charAt(0)}
                  </div>
                </Avatar>
                <div>
                  <h3 className="font-medium">{prescription.patientName}</h3>
                  <p className="text-sm text-gray-600">Patient ID: {prescription.patientId}</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="font-medium">{prescription.medication}</p>
                <p className="text-sm text-gray-600">
                  {prescription.dosage}, {prescription.frequency}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className={statusMap[prescription.status].class}>
                  {statusMap[prescription.status].label}
                </Badge>
                <Badge variant="outline">
                  Refills: {prescription.refillsRemaining}/{prescription.refills}
                </Badge>
              </div>
            </div>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-gray-100 flex flex-row md:flex-col p-4 gap-2 justify-end">
            <Link to={`/doctor/prescriptions/${prescription.id}`}>
              <Button variant="outline" className="w-full">View Details</Button>
            </Link>
            {prescription.status === "pending" && (
              <Button className="w-full bg-health-primary hover:bg-health-primary/90">Approve Refill</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrescriptionCard;
