
import React from 'react';
import DoctorDashboardContent from "../../components/doctor/DoctorDashboardContent";
import DoctorPortalPage from "../DoctorPortalPage";
import SMARTAuthButton from "@/components/auth/SMARTAuthButton";
import { FHIRCapabilityStatement, getCapabilityStatement } from "@/services/fhir/capabilityStatementService";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Shield, Server, AlertCircle } from "lucide-react";

export default function DoctorDashboard() {
  const { data: capabilityStatement, isLoading, error } = useQuery<FHIRCapabilityStatement>({
    queryKey: ['fhir', 'metadata'],
    queryFn: () => getCapabilityStatement(),
  });

  return (
    <DoctorPortalPage>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
          <SMARTAuthButton />
        </div>
        
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load FHIR server metadata: {error instanceof Error ? error.message : 'Unknown error'}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Server className="h-5 w-5 text-blue-600" />
                FHIR Server Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-6">
                  <Spinner size="md" className="mr-2" />
                  <span>Loading server metadata...</span>
                </div>
              ) : capabilityStatement ? (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <p className="font-medium">{capabilityStatement.software?.name || 'FHIR Server'}</p>
                      <p className="text-sm text-gray-500">Version: {capabilityStatement.software?.version || 'Unknown'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Supported Resources:</p>
                    <div className="flex flex-wrap gap-1">
                      {capabilityStatement.rest?.[0]?.resource?.map(resource => (
                        <span 
                          key={resource.type}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {resource.type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    FHIR Version: {capabilityStatement.fhirVersion}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">No server information available</p>
              )}
            </CardContent>
          </Card>
          
          <DoctorDashboardContent />
        </div>
      </div>
    </DoctorPortalPage>
  );
}
