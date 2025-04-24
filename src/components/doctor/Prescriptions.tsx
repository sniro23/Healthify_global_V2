
import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PrescriptionCard from "./PrescriptionCard";
import PrescriptionFilters from "./PrescriptionFilters";
import { fetchFHIRMedicationRequests } from "@/services/fhir/medicationRequestService";
import { MedicationRequestWithContext } from "@/models/fhir/medicationRequest";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@/components/ui/spinner";

export const Prescriptions = () => {
  const [medicationRequests, setMedicationRequests] = useState<MedicationRequestWithContext[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredStatus, setFilteredStatus] = useState("all");
  const [filteredType, setFilteredType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [authoredAfterDate, setAuthoredAfterDate] = useState<Date | undefined>(undefined);
  const [patientFilter, setPatientFilter] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadMedicationRequests = async () => {
      try {
        const data = await fetchFHIRMedicationRequests();
        setMedicationRequests(data);
      } catch (error) {
        console.error("Error loading medication requests:", error);
        toast({
          title: "Error",
          description: "Failed to load prescriptions. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadMedicationRequests();
  }, [toast]);

  // Reset all filters to their default state
  const handleResetFilters = () => {
    setFilteredStatus("all");
    setFilteredType("all");
    setSearchQuery("");
    setAuthoredAfterDate(undefined);
    setPatientFilter([]);
    
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared."
    });
  };

  // Filter medication requests based on all criteria
  const filteredMedicationRequests = medicationRequests.filter((item) => {
    // Filter by search query (medication name or patient name)
    const matchesSearch = 
      item.medicationRequest.medicationCodeableConcept?.text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.patient.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = filteredStatus === "all" || item.medicationRequest.status === filteredStatus;
    
    // Filter by type
    const typeExtension = item.medicationRequest.extension?.find(
      ext => ext.url === "http://healthify.org/fhir/StructureDefinition/prescription-type"
    );
    
    const medicationType = typeExtension?.valueCode || "medication";
    const matchesType = filteredType === "all" || medicationType === filteredType;
    
    // Filter by authored date
    const authoredOnDate = item.medicationRequest.authoredOn ? new Date(item.medicationRequest.authoredOn) : null;
    const matchesDate = !authoredAfterDate || 
      (authoredOnDate && authoredOnDate >= authoredAfterDate);
    
    // Filter by patient
    const matchesPatient = patientFilter.length === 0 || 
      patientFilter.includes(item.patient.id);
    
    return matchesSearch && matchesStatus && matchesType && matchesDate && matchesPatient;
  });

  // Group medication requests by status
  const activeMedicationRequests = filteredMedicationRequests.filter(
    item => item.medicationRequest.status === "active"
  );
  
  const pendingMedicationRequests = filteredMedicationRequests.filter(
    item => item.medicationRequest.status === "on-hold"
  );
  
  const completedMedicationRequests = filteredMedicationRequests.filter(
    item => ["completed", "stopped", "cancelled"].includes(item.medicationRequest.status)
  );

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
        searchQuery={searchQuery}
        statusFilter={filteredStatus}
        typeFilter={filteredType}
        authoredAfterDate={authoredAfterDate}
        patientFilter={patientFilter}
        onSearchChange={setSearchQuery}
        onStatusFilterChange={setFilteredStatus}
        onTypeFilterChange={setFilteredType}
        onAuthoredAfterDateChange={setAuthoredAfterDate}
        onPatientFilterChange={setPatientFilter}
        onResetFilters={handleResetFilters}
      />

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">
            Active
            {activeMedicationRequests.length > 0 && (
              <span className="ml-1 bg-green-100 text-green-800 rounded-full h-5 min-w-5 px-1 inline-flex items-center justify-center text-xs">
                {activeMedicationRequests.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending Refill
            {pendingMedicationRequests.length > 0 && (
              <span className="ml-1 bg-yellow-100 text-yellow-800 rounded-full h-5 min-w-5 px-1 inline-flex items-center justify-center text-xs">
                {pendingMedicationRequests.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="expired">
            Completed/Expired
            {completedMedicationRequests.length > 0 && (
              <span className="ml-1 bg-gray-100 text-gray-800 rounded-full h-5 min-w-5 px-1 inline-flex items-center justify-center text-xs">
                {completedMedicationRequests.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4 mt-4">
          {loading ? (
            <div className="text-center py-8">
              <Spinner className="mx-auto mb-2" />
              <p>Loading prescriptions...</p>
            </div>
          ) : activeMedicationRequests.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-2">No active prescriptions found</p>
              <p className="text-sm text-gray-500">
                {searchQuery || filteredStatus !== "all" || filteredType !== "all" || 
                 authoredAfterDate || patientFilter.length > 0 ? 
                  "Try adjusting your filters" : 
                  "All active prescriptions will appear here"
                }
              </p>
            </div>
          ) : (
            activeMedicationRequests.map((item) => (
              <PrescriptionCard key={item.medicationRequest.id} medicationRequest={item} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4 mt-4">
          {loading ? (
            <div className="text-center py-8">
              <Spinner className="mx-auto mb-2" />
              <p>Loading prescriptions...</p>
            </div>
          ) : pendingMedicationRequests.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-2">No pending refill prescriptions found</p>
              <p className="text-sm text-gray-500">
                {searchQuery || filteredStatus !== "all" || filteredType !== "all" || 
                 authoredAfterDate || patientFilter.length > 0 ? 
                  "Try adjusting your filters" : 
                  "Prescriptions pending refill will appear here"
                }
              </p>
            </div>
          ) : (
            pendingMedicationRequests.map((item) => (
              <PrescriptionCard key={item.medicationRequest.id} medicationRequest={item} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="expired" className="space-y-4 mt-4">
          {loading ? (
            <div className="text-center py-8">
              <Spinner className="mx-auto mb-2" />
              <p>Loading prescriptions...</p>
            </div>
          ) : completedMedicationRequests.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-2">No completed or expired prescriptions found</p>
              <p className="text-sm text-gray-500">
                {searchQuery || filteredStatus !== "all" || filteredType !== "all" || 
                 authoredAfterDate || patientFilter.length > 0 ? 
                  "Try adjusting your filters" : 
                  "Completed and expired prescriptions will appear here"
                }
              </p>
            </div>
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
