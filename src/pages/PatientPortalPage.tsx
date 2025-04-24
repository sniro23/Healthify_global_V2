
import React from "react";
import { PatientPortal } from "@/components/PatientPortal";
import { Link } from "react-router-dom";
import { Button } from "@/packages/ui-kit";
import SMARTAuthButton from "@/components/auth/SMARTAuthButton";
import { useSMARTAuth } from "@/services/auth/smartAuthService";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PatientPortalPage = () => {
  const { isAuthorized, getAuthContext } = useSMARTAuth();
  const authContext = getAuthContext();
  
  // Determine if we have a patient context
  const hasPatientContext = Boolean(authContext.patientId);
  
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-health-primary text-white p-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Patient Portal</h1>
        <div className="flex items-center gap-2">
          <SMARTAuthButton
            variant="outline"
            className="border-white text-white hover:text-health-primary hover:bg-white"
          />
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
      
      {isAuthorized() && !hasPatientContext && (
        <Alert className="m-3">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Patient Context Missing</AlertTitle>
          <AlertDescription>
            You've authenticated with SMART on FHIR, but no patient context was provided.
            Some features may be limited.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex-1 min-h-0">
        <PatientPortal />
      </div>
    </div>
  );
};

export default PatientPortalPage;
