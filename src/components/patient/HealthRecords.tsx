
import React from "react";
import RecordCard from "./RecordCard";
import { Heart } from "lucide-react";

const mockRecords = [
  {
    id: "r1",
    title: "Blood Test",
    date: "March 15th, 2025",
    description: "Routine blood panel. All values within normal range.",
  },
  {
    id: "r2",
    title: "X-Ray - Chest",
    date: "February 2nd, 2025",
    description: "No signs of pneumonia or abnormality.",
  },
];

const HealthRecords = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
      <Heart className="h-6 w-6 text-health-primary" />
      Health Records
    </h2>
    <div className="flex flex-col gap-4">
      {mockRecords.map((rec) => (
        <RecordCard key={rec.id} record={rec} />
      ))}
    </div>
  </div>
);

export default HealthRecords;
