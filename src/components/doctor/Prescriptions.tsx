
import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PrescriptionCard from "./PrescriptionCard";
import PrescriptionFilters from "./PrescriptionFilters";
import { fetchFHIRMedicationRequests } from "@/services/fhir/medicationRequestService";
import { MedicationRequestWithContext } from "@/models/fhir/medicationRequest";

export const Prescriptions = () => {
  const [medicationRequests, setMedicationRequests] = useState<MedicationRequestWithContext[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredStatus, setFilteredStatus] = useState("all");
  const [filteredType, setFilteredType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadMedicationRequests = async () => {
      try {
        const data = await fetchFHIRMedicationRequests();
        setMedicationRequests(data);
      } catch (error) {
        console.error("Error loading medication requests:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadMedicationRequests();
  }, []);

  // Filter medication requests based on search query and filters
  const filteredMedicationRequests = medicationRequests.filter((item) => {
    // Filter by search query (medication name or patient name)
    const matchesSearch = 
      item.medicationRequest.medicationCodeableConcept?.text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.patient.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = 
      filteredStatus === "all" || 
      item.medicationRequest.status === 
        (filteredStatus === "active" ? "active" : 
         filteredStatus === "expired" ? "completed" : 
         filteredStatus === "refill" ? "on-hold" : item.medicationRequest.status);
    
    // Filter by type
    const typeExtension = item.medicationRequest.extension?.find(
      ext => ext.url === "http://healthify.org/fhir/StructureDefinition/prescription-type"
    );
    
    const medicationType = typeExtension?.valueCode || "medication";
    const matchesType = filteredType === "all" || medicationType === filteredType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Group medication requests by status
  const activeMedicationRequests = filteredMedicationRequests.filter(
    item => item.medicationRequest.status === "active"
  );
  
  const pendingMedicationRequests = filteredMedicationRequests.filter(
    item => item.medicationRequest.status === "on-hold"
  );
  
  const completedMedicationRequests = filteredMedicationRequests.filter(
    item => item.medicationRequest.status === "completed"
  );

  // Handle search and filter changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };
  
  const handleStatusFilterChange = (value: string) => {
    setFilteredStatus(value);
  };
  
  const handleTypeFilterChange = (value: string) => {
    setFilteredType(value);
  };

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
      
      <PrescriptionFilters 
        onSearchChange={handleSearchChange}
        onStatusFilterChange={handleStatusFilterChange}
        onTypeFilterChange={handleTypeFilterChange}
        searchQuery={searchQuery}
        statusFilter={filteredStatus}
        typeFilter={filteredType}
      />

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending Refill</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4 mt-4">
          {loading ? (
            <div className="text-center py-4">Loading prescriptions...</div>
          ) : activeMedicationRequests.length === 0 ? (
            <div className="text-center py-4">No active prescriptions found.</div>
          ) : (
            activeMedicationRequests.map((item) => (
              <PrescriptionCard key={item.medicationRequest.id} medicationRequest={item} />
            ))
          )}
        </TabsContent>
        <TabsContent value="pending" className="space-y-4 mt-4">
          {loading ? (
            <div className="text-center py-4">Loading prescriptions...</div>
          ) : pendingMedicationRequests.length === 0 ? (
            <div className="text-center py-4">No pending refill prescriptions found.</div>
          ) : (
            pendingMedicationRequests.map((item) => (
              <PrescriptionCard key={item.medicationRequest.id} medicationRequest={item} />
            ))
          )}
        </TabsContent>
        <TabsContent value="expired" className="space-y-4 mt-4">
          {loading ? (
            <div className="text-center py-4">Loading prescriptions...</div>
          ) : completedMedicationRequests.length === 0 ? (
            <div className="text-center py-4">No expired prescriptions found.</div>
          ) : (
            completedMedicationRequests.map((item) => (
              <PrescriptionCard key={item.medicationRequest.id} medicationRequest={item} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Prescriptions;
