
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, Clock, Calendar, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Prescriptions = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Prescriptions</h1>
          <p className="text-gray-600">Manage and track patient prescriptions</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-health-primary hover:bg-health-primary/90">
            <Plus className="mr-1 h-4 w-4" />
            New Prescription
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="w-full md:w-72">
          <Input 
            placeholder="Search prescriptions..." 
            className="w-full"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="refill">Needs Refill</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="medication">Medication</SelectItem>
              <SelectItem value="controlled">Controlled</SelectItem>
              <SelectItem value="otc">OTC</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="hidden sm:flex">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending Refill</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4 mt-4">
          {activePrescriptions.map((prescription) => (
            <PrescriptionCard key={prescription.id} prescription={prescription} />
          ))}
        </TabsContent>
        <TabsContent value="pending" className="space-y-4 mt-4">
          {pendingPrescriptions.map((prescription) => (
            <PrescriptionCard key={prescription.id} prescription={prescription} />
          ))}
        </TabsContent>
        <TabsContent value="expired" className="space-y-4 mt-4">
          {expiredPrescriptions.map((prescription) => (
            <PrescriptionCard key={prescription.id} prescription={prescription} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface Prescription {
  id: string;
  patientName: string;
  patientId: string;
  medication: string;
  dosage: string;
  frequency: string;
  issueDate: string;
  expiryDate: string;
  status: "active" | "expired" | "pending";
  type: "medication" | "controlled" | "otc";
  refills: number;
  refillsRemaining: number;
}

const PrescriptionCard = ({ prescription }: { prescription: Prescription }) => {
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

const activePrescriptions: Prescription[] = [
  {
    id: "1",
    patientName: "Sarah Miller",
    patientId: "PT-78542",
    medication: "Lisinopril 10mg",
    dosage: "1 tablet",
    frequency: "once daily",
    issueDate: "Apr 10, 2025",
    expiryDate: "Jul 10, 2025",
    status: "active",
    type: "medication",
    refills: 3,
    refillsRemaining: 2
  },
  {
    id: "2",
    patientName: "John Davis",
    patientId: "PT-34567",
    medication: "Metformin 500mg",
    dosage: "1 tablet",
    frequency: "twice daily",
    issueDate: "Apr 15, 2025",
    expiryDate: "Jul 15, 2025",
    status: "active",
    type: "medication",
    refills: 2,
    refillsRemaining: 2
  }
];

const pendingPrescriptions: Prescription[] = [
  {
    id: "3",
    patientName: "Emma Wilson",
    patientId: "PT-56789",
    medication: "Atorvastatin 20mg",
    dosage: "1 tablet",
    frequency: "once daily at bedtime",
    issueDate: "Mar 15, 2025",
    expiryDate: "Jun 15, 2025",
    status: "pending",
    type: "medication",
    refills: 3,
    refillsRemaining: 0
  }
];

const expiredPrescriptions: Prescription[] = [
  {
    id: "4",
    patientName: "Robert Thompson",
    patientId: "PT-45678",
    medication: "Amoxicillin 500mg",
    dosage: "1 capsule",
    frequency: "three times daily",
    issueDate: "Jan 10, 2025",
    expiryDate: "Feb 10, 2025",
    status: "expired",
    type: "medication",
    refills: 0,
    refillsRemaining: 0
  }
];

export default Prescriptions;
