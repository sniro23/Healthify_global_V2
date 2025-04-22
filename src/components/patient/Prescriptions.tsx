
import React from "react";
import PrescriptionCard from "./PrescriptionCard";
import { FileText } from "lucide-react";

const mockPrescriptions = [
  {
    id: "p1",
    medication: "Atorvastatin",
    dosage: "20mg, once daily",
    doctor: "Dr. Jane Smith",
    status: "Active",
    refillDue: "May 5th, 2025",
  },
  {
    id: "p2",
    medication: "Lisinopril",
    dosage: "10mg, once daily",
    doctor: "Dr. Amir Patel",
    status: "Expired",
    refillDue: null,
  },
];

const Prescriptions = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
      <FileText className="h-6 w-6 text-health-primary" />
      Prescriptions
    </h2>
    <div className="flex flex-col gap-4">
      {mockPrescriptions.map((rx) => (
        <PrescriptionCard key={rx.id} prescription={rx} />
      ))}
    </div>
  </div>
);

export default Prescriptions;
