
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PrescriptionCard from "./PrescriptionCard";
import PrescriptionFilters from "./PrescriptionFilters";
import { activePrescriptions, pendingPrescriptions, expiredPrescriptions } from "@/types/prescription";

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
      
      <PrescriptionFilters />

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

export default Prescriptions;
