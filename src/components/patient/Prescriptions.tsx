
import React from "react";
import { Link } from "react-router-dom";
import PrescriptionCard from "./PrescriptionCard";
import { Pill, Search } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/packages/ui-kit";

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

const mockRoutineMedications = [
  {
    id: "r1",
    medication: "Vitamin D3",
    dosage: "1000 IU, once daily",
    startDate: "January 10th, 2025",
    endDate: null,
  },
  {
    id: "r2",
    medication: "Multivitamin",
    dosage: "1 tablet, once daily",
    startDate: "March 1st, 2025",
    endDate: null,
  },
];

const mockMedicationHistory = [
  {
    id: "h1",
    medication: "Amoxicillin",
    dosage: "500mg, three times daily",
    doctor: "Dr. Jane Smith",
    startDate: "January 5th, 2025",
    endDate: "January 15th, 2025",
    reason: "Bacterial Infection",
  },
  {
    id: "h2",
    medication: "Prednisone",
    dosage: "10mg, once daily, tapering",
    doctor: "Dr. Kevin Lee",
    startDate: "November 10th, 2024",
    endDate: "November 25th, 2024",
    reason: "Acute Asthma Exacerbation",
  },
];

const Prescriptions = () => {
  const [activeTab, setActiveTab] = React.useState("prescribed");
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const filteredPrescriptions = searchTerm 
    ? mockPrescriptions.filter(p => 
        p.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.doctor.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : mockPrescriptions;
    
  const filteredRoutine = searchTerm
    ? mockRoutineMedications.filter(p => 
        p.medication.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : mockRoutineMedications;
    
  const filteredHistory = searchTerm
    ? mockMedicationHistory.filter(p => 
        p.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.doctor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.reason?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : mockMedicationHistory;
  
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Pill className="h-6 w-6 text-health-primary" />
        Medications
      </h2>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeTab === "prescribed" ? "default" : "outline"}
            className={activeTab === "prescribed" ? "bg-health-primary" : ""}
            onClick={() => setActiveTab("prescribed")}
          >
            Prescribed Medications
          </Button>
          <Button
            variant={activeTab === "routine" ? "default" : "outline"}
            className={activeTab === "routine" ? "bg-health-primary" : ""}
            onClick={() => setActiveTab("routine")}
          >
            Routine Medications
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "outline"}
            className={activeTab === "history" ? "bg-health-primary" : ""}
            onClick={() => setActiveTab("history")}
          >
            Medication History
          </Button>
        </div>
      </div>
      
      <div className="mb-6 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search medications..."
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {activeTab === "prescribed" && (
        filteredPrescriptions.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredPrescriptions.map((rx) => (
              <Link to={`/patient/prescriptions/${rx.id}`} key={rx.id} style={{ textDecoration: 'none' }}>
                <PrescriptionCard prescription={rx} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-700 mb-2">No Prescribed Medications Found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? "No medications match your search." : "You don't have any active prescriptions."}
            </p>
          </div>
        )
      )}
      
      {activeTab === "routine" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Self-Reported Medications</h3>
            <Button>Add Medication</Button>
          </div>
          
          {filteredRoutine.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRoutine.map((med) => (
                <Card key={med.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{med.medication}</CardTitle>
                    <p className="text-gray-600">{med.dosage}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        Started: {med.startDate}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-600">Stop</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-2">No Routine Medications Found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? "No medications match your search." : "You haven't added any routine medications yet."}
              </p>
              <Button>Add Your First Medication</Button>
            </div>
          )}
        </div>
      )}
      
      {activeTab === "history" && (
        filteredHistory.length > 0 ? (
          <div className="space-y-4">
            {filteredHistory.map((med) => (
              <Card key={med.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-lg">{med.medication}</CardTitle>
                      <p className="text-gray-600">{med.dosage}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {med.startDate} - {med.endDate}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <p className="text-sm"><span className="text-gray-500">Prescribed by:</span> {med.doctor}</p>
                    <p className="text-sm"><span className="text-gray-500">Reason:</span> {med.reason}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-700 mb-2">No Medication History Found</h3>
            <p className="text-gray-500">
              {searchTerm ? "No medications match your search." : "You don't have any past medication records."}
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Prescriptions;
