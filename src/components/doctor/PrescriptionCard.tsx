
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Pill } from "lucide-react";
import { 
  MedicationRequestWithContext 
} from "@/models/fhir/medicationRequest";
import { 
  getMedicationRequestStatusDisplay,
  formatMedicationRequestDate 
} from "@/services/fhir/medicationRequestService";

interface PrescriptionCardProps {
  medicationRequest: MedicationRequestWithContext;
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({ medicationRequest }) => {
  const { medicationRequest: request, patient } = medicationRequest;
  const statusInfo = getMedicationRequestStatusDisplay(request.status);
  
  // Extract medication name
  const medicationName = request.medicationCodeableConcept?.text || "Unknown Medication";
  
  // Extract dosage instructions
  const dosageText = request.dosageInstruction?.[0]?.text || "No dosage information";
  
  // Get dates
  const issueDate = formatMedicationRequestDate(request.authoredOn || "");
  
  // Get refills from extensions
  const refillsRemainingExt = request.extension?.find(
    ext => ext.url === "http://healthify.org/fhir/StructureDefinition/refills-remaining"
  );
  const refillsRemaining = refillsRemainingExt?.valueInteger !== undefined ? refillsRemainingExt.valueInteger : 0;
  
  // Get medication type from extensions
  const typeExt = request.extension?.find(
    ext => ext.url === "http://healthify.org/fhir/StructureDefinition/prescription-type"
  );
  const medicationType = typeExt?.valueCode || "medication";
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between md:justify-start">
              <div className="flex gap-2">
                <h3 className="font-medium text-lg">{medicationName}</h3>
                <Badge variant="outline" className="capitalize">
                  {medicationType}
                </Badge>
              </div>
              <Badge className={`md:hidden ${statusInfo.color}`}>
                {statusInfo.label}
              </Badge>
            </div>
            
            <p className="text-gray-600">{dosageText}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Patient: </span>
                <span>{patient.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Issued: </span>
                <span>{issueDate}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-sm">
              <Pill className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Refills Remaining: </span>
              <span>{refillsRemaining}</span>
            </div>
          </div>
          
          <div className="mt-3 md:mt-0 flex md:flex-col items-center gap-3">
            <Badge className={`hidden md:flex ${statusInfo.color}`}>
              {statusInfo.label}
            </Badge>
            <div className="flex gap-1 md:mt-auto">
              <Button variant="outline" size="sm">Details</Button>
              {request.status === "active" && (
                <Button variant="default" size="sm" className="bg-health-primary hover:bg-health-primary/90">
                  Refill
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrescriptionCard;
