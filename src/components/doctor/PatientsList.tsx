
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const PatientsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Patients</h1>
          <p className="text-gray-600">View and manage your patient list</p>
        </div>
        <div>
          <Link to="/doctor/patients/add">
            <Button className="bg-health-primary hover:bg-health-primary/90">Add New Patient</Button>
          </Link>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="w-full md:w-72">
          <Input
            placeholder="Search patients..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="new">New</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="hidden sm:flex">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Patients</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="p-4">
              <div className="grid grid-cols-12 text-xs font-medium text-gray-500">
                <div className="col-span-5">PATIENT</div>
                <div className="col-span-2 hidden md:block">STATUS</div>
                <div className="col-span-3 hidden md:block">LAST VISIT</div>
                <div className="col-span-2"></div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {filteredPatients.map(patient => (
                <div 
                  key={patient.id}
                  className="grid grid-cols-12 items-center p-4 hover:bg-gray-50 border-t border-gray-100"
                >
                  <div className="col-span-5">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-health-primary">
                          {patient.name.charAt(0)}
                        </div>
                      </Avatar>
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-sm text-gray-500">{patient.id}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 hidden md:block">
                    <StatusBadge status={patient.status} />
                  </div>
                  <div className="col-span-3 hidden md:block">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                      {patient.lastVisit}
                    </div>
                  </div>
                  <div className="col-span-7 md:col-span-2 flex justify-end">
                    <div className="flex items-center gap-2">
                      <Link to={`/doctor/patients/${patient.id}`}>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active">
          <Card>
            <CardContent>
              Active patients will be displayed here
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="new">
          <Card>
            <CardContent>
              New patients will be displayed here
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const statusMap: Record<string, { class: string, label: string }> = {
    active: { 
      class: "bg-green-50 text-green-700 border-green-200", 
      label: "Active" 
    },
    inactive: { 
      class: "bg-gray-50 text-gray-600 border-gray-200", 
      label: "Inactive" 
    },
    new: { 
      class: "bg-blue-50 text-blue-700 border-blue-200", 
      label: "New" 
    },
  };
  
  const statusInfo = statusMap[status] || statusMap.inactive;
  
  return (
    <Badge variant="outline" className={statusInfo.class}>
      {statusInfo.label}
    </Badge>
  );
};

const patients = [
  {
    id: "PT-78542",
    name: "Sarah Miller",
    status: "active",
    lastVisit: "Apr 15, 2025"
  },
  {
    id: "PT-34567",
    name: "John Davis",
    status: "new",
    lastVisit: "Apr 20, 2025"
  },
  {
    id: "PT-56789",
    name: "Emma Wilson",
    status: "active",
    lastVisit: "Apr 10, 2025"
  },
  {
    id: "PT-12345",
    name: "Michael Brown",
    status: "inactive",
    lastVisit: "Mar 5, 2025"
  },
  {
    id: "PT-23456",
    name: "Jennifer Smith",
    status: "active",
    lastVisit: "Apr 18, 2025"
  },
  {
    id: "PT-45678",
    name: "Robert Wilson",
    status: "active",
    lastVisit: "Apr 12, 2025"
  }
];

export default PatientsList;
