import { 
  FHIRMedicationRequest, 
  MedicationRequestWithContext,
  mapStatusToFHIR,
  generateFhirUuid
} from "../../models/fhir/medicationRequest";
import { 
  activePrescriptions, 
  pendingPrescriptions, 
  expiredPrescriptions,
  Prescription
} from "../../types/prescription";

/**
 * Converts the app Prescription model to a FHIR-compliant MedicationRequest 
 */
const convertToFHIRMedicationRequest = (prescription: Prescription): FHIRMedicationRequest => {
  // Generate the current timestamp for metadata
  const now = new Date().toISOString();
  
  return {
    resourceType: "MedicationRequest",
    id: prescription.id,
    meta: {
      versionId: "1",
      lastUpdated: now,
      profile: ["http://healthify.org/fhir/StructureDefinition/medication-request"]
    },
    identifier: [
      {
        system: "http://healthify.org/prescription-identifiers",
        value: `PRES-${prescription.id}`
      }
    ],
    extension: [
      {
        url: "http://healthify.org/fhir/StructureDefinition/prescription-type",
        valueCode: prescription.type
      },
      {
        url: "http://healthify.org/fhir/StructureDefinition/refills-remaining",
        valueInteger: prescription.refillsRemaining
      }
    ],
    status: mapStatusToFHIR(prescription.status),
    intent: "order",
    medicationCodeableConcept: {
      coding: [
        {
          system: "http://healthify.org/medication-codes",
          code: prescription.medication.toLowerCase().replace(/\s+/g, '-'),
          display: prescription.medication
        }
      ],
      text: prescription.medication
    },
    subject: {
      reference: `Patient/${prescription.patientId}`,
      display: prescription.patientName
    },
    authoredOn: prescription.issueDate,
    dosageInstruction: [
      {
        text: `${prescription.dosage}, ${prescription.frequency}`,
        timing: {
          repeat: {
            frequency: 1,
            period: 1,
            periodUnit: "d"
          }
        }
      }
    ],
    dispenseRequest: {
      numberOfRepeatsAllowed: prescription.refills,
    },
    substitution: {
      allowedBoolean: false
    }
  };
};

/**
 * Fetch all medication requests as FHIR resources
 */
export const fetchFHIRMedicationRequests = async (): Promise<MedicationRequestWithContext[]> => {
  // Combine all prescriptions
  const allPrescriptions = [
    ...activePrescriptions,
    ...pendingPrescriptions,
    ...expiredPrescriptions
  ];
  
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const medicationRequests = allPrescriptions.map(prescription => {
        const fhirMedicationRequest = convertToFHIRMedicationRequest(prescription);
        
        return {
          medicationRequest: fhirMedicationRequest,
          patient: {
            id: prescription.patientId,
            name: prescription.patientName
          },
          doctor: {
            id: "practitioner-1", // Mock doctor ID
            name: "Dr. Johnson" // Mock doctor name
          }
        };
      });
      
      resolve(medicationRequests);
    }, 500);
  });
};

/**
 * Get display information for a medication request status
 */
export const getMedicationRequestStatusDisplay = (status: string): { label: string; color: string } => {
  switch (status) {
    case "active":
      return { label: "Active", color: "bg-green-100 text-green-800" };
    case "on-hold":
      return { label: "Pending", color: "bg-yellow-100 text-yellow-800" };
    case "completed":
      return { label: "Completed", color: "bg-blue-100 text-blue-800" };
    case "cancelled":
      return { label: "Cancelled", color: "bg-red-100 text-red-800" };
    case "stopped":
      return { label: "Stopped", color: "bg-purple-100 text-purple-800" };
    default:
      return { label: status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' '), color: "bg-gray-100 text-gray-800" };
  }
};

/**
 * Format medication request dates
 */
export const formatMedicationRequestDate = (dateString: string): string => {
  try {
    // Check if the date is already in a friendly format like "Apr 10, 2025"
    if (/[A-Za-z]+\s\d{1,2},\s\d{4}/.test(dateString)) {
      return dateString;
    }
    
    // Otherwise, format it
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return original if parsing fails
  }
};
