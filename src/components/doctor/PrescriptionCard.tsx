
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Calendar, Clock, FileText, Pill } from "lucide-react";
import { 
  MedicationRequestWithContext 
} from "@/models/fhir/medicationRequest";
import { 
  getMedicationRequestStatusDisplay,
  formatMedicationRequestDate 
} from "@/services/fhir/medicationRequestService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useFHIRUpdate } from "@/hooks/use-fhir";

interface PrescriptionCardProps {
  medicationRequest: MedicationRequestWithContext;
  onRefill?: (id: string) => void;
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({ medicationRequest, onRefill }) => {
  const { medicationRequest: request, patient } = medicationRequest;
  const statusInfo = getMedicationRequestStatusDisplay(request.status);
  const [showDetails, setShowDetails] = React.useState(false);
  
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
  
  // FHIR update hook
  const { mutate: updateMedicationRequest } = useFHIRUpdate<any>();
  
  const handleRefill = () => {
    if (onRefill) {
      onRefill(request.id);
    } else {
      // Default implementation if no callback provided
      updateMedicationRequest({
        ...request,
        extension: [
          ...(request.extension || []).filter(ext => 
            ext.url !== "http://healthify.org/fhir/StructureDefinition/refills-remaining"
          ),
          {
            url: "http://healthify.org/fhir/StructureDefinition/refills-remaining",
            valueInteger: refillsRemaining + 1
          }
        ]
      });
    }
  };
  
  return (
    <>
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
                <Button variant="outline" size="sm" onClick={() => setShowDetails(true)}>
                  Details
                </Button>
                {request.status === "active" && (
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="bg-health-primary hover:bg-health-primary/90"
                    onClick={handleRefill}
                  >
                    Refill
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* FHIR Resource Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5 text-health-primary" />
              FHIR MedicationRequest Details
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Prescription Information</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="py-1 font-medium text-gray-600">Medication:</td>
                      <td>{medicationName}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-gray-600">Dosage:</td>
                      <td>{dosageText}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-gray-600">Status:</td>
                      <td>
                        <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-gray-600">Type:</td>
                      <td className="capitalize">{medicationType}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-gray-600">Authored:</td>
                      <td>{issueDate}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-gray-600">Refills:</td>
                      <td>{refillsRemaining} remaining</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Patient Information</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="py-1 font-medium text-gray-600">Name:</td>
                      <td>{patient.name}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-gray-600">ID:</td>
                      <td>{patient.id}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-gray-600">Reference:</td>
                      <td className="text-xs font-mono">{request.subject.reference}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* FHIR Resource Raw View (for development) */}
            <div className="mt-4">
              <details className="text-sm">
                <summary className="cursor-pointer font-medium text-health-primary mb-2">
                  View Raw FHIR Resource
                </summary>
                <div className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                  <pre className="text-xs">{JSON.stringify(request, null, 2)}</pre>
                </div>
              </details>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetails(false)}>
              Close
            </Button>
            {request.status === "active" && (
              <Button 
                className="bg-health-primary hover:bg-health-primary/90"
                onClick={handleRefill}
              >
                Process Refill
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PrescriptionCard;
