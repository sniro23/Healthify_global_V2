
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/packages/ui-kit";
import { Button } from "@/packages/ui-kit";
import { Calendar, User, Clock, Download, AlertTriangle } from "lucide-react";

const mockPrescriptions = {
  "p1": {
    id: "p1",
    medication: "Atorvastatin",
    dosage: "20mg, once daily",
    instructions: "Take with evening meal",
    doctor: "Dr. Jane Smith",
    specialty: "Cardiologist",
    status: "Active",
    refillDue: "May 5th, 2025",
    prescribedDate: "April 5th, 2025",
    duration: "30 days",
    sideEffects: "May cause dizziness, headache, or upset stomach",
    warnings: "Avoid grapefruit juice while taking this medication",
    pharmacy: "HealthPlus Pharmacy - City Branch",
    refillsRemaining: 2
  },
  "p2": {
    id: "p2",
    medication: "Lisinopril",
    dosage: "10mg, once daily",
    instructions: "Take in the morning with or without food",
    doctor: "Dr. Amir Patel",
    specialty: "Internal Medicine",
    status: "Expired",
    refillDue: null,
    prescribedDate: "January 10th, 2025",
    duration: "90 days",
    sideEffects: "May cause dry cough, dizziness, or headache",
    warnings: "Report persistent cough to your doctor",
    pharmacy: "MedExpress Pharmacy",
    refillsRemaining: 0
  },
};

const MedicationDetails = () => {
  const { id } = useParams();
  const prescription = id && mockPrescriptions[id] ? mockPrescriptions[id] : null;

  if (!prescription) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold mb-3">Prescription Not Found</h2>
        <p className="mb-4">The prescription you're looking for doesn't exist or may have been removed.</p>
        <Link to="/patient/prescriptions">
          <Button>Return to Prescriptions</Button>
        </Link>
      </div>
    );
  }

  const isActive = prescription.status === "Active";

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        Prescription Details
      </h2>

      <Card className="mb-6">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-xl">{prescription.medication}</CardTitle>
            <p className="text-gray-600">{prescription.dosage}</p>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${
            isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
          }`}>
            {prescription.status}
          </span>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <User className="h-5 w-5 text-health-primary mt-0.5" />
            <div>
              <p className="font-medium">Prescribed By</p>
              <p className="text-gray-700">{prescription.doctor}</p>
              <p className="text-sm text-gray-500">{prescription.specialty}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-health-primary mt-0.5" />
            <div>
              <p className="font-medium">Prescription Date</p>
              <p className="text-gray-700">{prescription.prescribedDate}</p>
              <p className="text-sm text-gray-500">Duration: {prescription.duration}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-health-primary mt-0.5" />
            <div>
              <p className="font-medium">Instructions</p>
              <p className="text-gray-700">{prescription.instructions}</p>
            </div>
          </div>
          
          {isActive && prescription.refillDue && (
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-health-primary mt-0.5" />
              <div>
                <p className="font-medium">Refill Information</p>
                <p className="text-gray-700">Due: {prescription.refillDue}</p>
                <p className="text-sm text-gray-500">
                  Refills remaining: {prescription.refillsRemaining}
                </p>
              </div>
            </div>
          )}
          
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <p className="font-medium">Important Information</p>
              <p className="text-gray-700">Side effects: {prescription.sideEffects}</p>
              <p className="text-gray-700 mt-1">Warnings: {prescription.warnings}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="font-medium mb-1">Pharmacy</p>
            <p className="text-gray-700">{prescription.pharmacy}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {isActive && (
            <Button className="w-full">
              <Download className="h-4 w-4 mr-2" /> Download Prescription
            </Button>
          )}
          {!isActive && (
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" /> View Archived Prescription
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <div className="flex justify-between">
        <Link to="/patient/prescriptions">
          <Button variant="outline">Back to Prescriptions</Button>
        </Link>
      </div>
    </div>
  );
};

export default MedicationDetails;
