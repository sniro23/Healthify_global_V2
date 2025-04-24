
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
 * Fetch all medication requests as FHIR resources with support for FHIR search parameters
 * 
 * @param params Optional search parameters following FHIR search parameter patterns
 * @returns Promise with filtered medication requests
 */
export const fetchFHIRMedicationRequests = async (
  params?: {
    status?: string,
    "medication-type"?: string,
    patient?: string,
    "authored-on-gt"?: string, // Greater than date
    _include?: string[], // Related resources to include
    _count?: number // Maximum number of results
  }
): Promise<MedicationRequestWithContext[]> => {
  // Combine all prescriptions
  const allPrescriptions = [
    ...activePrescriptions,
    ...pendingPrescriptions,
    ...expiredPrescriptions
  ];
  
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Convert to FHIR resources
      let medicationRequests = allPrescriptions.map(prescription => {
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
      
      // Apply FHIR search parameters if provided
      if (params) {
        // Filter by status
        if (params.status) {
          const statuses = params.status.split(',');
          medicationRequests = medicationRequests.filter(item => 
            statuses.includes(item.medicationRequest.status)
          );
        }
        
        // Filter by medication type (custom extension)
        if (params["medication-type"]) {
          const types = params["medication-type"].split(',');
          medicationRequests = medicationRequests.filter(item => {
            const typeExt = item.medicationRequest.extension?.find(
              ext => ext.url === "http://healthify.org/fhir/StructureDefinition/prescription-type"
            );
            const type = typeExt?.valueCode || "medication";
            return types.includes(type);
          });
        }
        
        // Filter by patient
        if (params.patient) {
          const patientIds = params.patient.split(',');
          medicationRequests = medicationRequests.filter(item =>
            patientIds.some(id => item.medicationRequest.subject.reference.includes(id))
          );
        }
        
        // Filter by authored date (greater than)
        if (params["authored-on-gt"]) {
          const compareDate = new Date(params["authored-on-gt"]);
          medicationRequests = medicationRequests.filter(item => {
            if (!item.medicationRequest.authoredOn) return false;
            return new Date(item.medicationRequest.authoredOn) > compareDate;
          });
        }
        
        // Apply count limit
        if (params._count && params._count > 0) {
          medicationRequests = medicationRequests.slice(0, params._count);
        }
      }
      
      resolve(medicationRequests);
    }, 500);
  });
};

/**
 * Create a new FHIR MedicationRequest
 * 
 * @param medicationRequest The MedicationRequest to create
 * @returns Promise with the created MedicationRequest
 */
export const createFHIRMedicationRequest = async (
  medicationRequest: Omit<FHIRMedicationRequest, 'id' | 'meta'>
): Promise<FHIRMedicationRequest> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = new Date().toISOString();
      const id = generateFhirUuid().split(':')[2]; // Extract UUID part
      
      const createdResource: FHIRMedicationRequest = {
        ...medicationRequest,
        id,
        meta: {
          versionId: "1",
          lastUpdated: now,
          profile: ["http://healthify.org/fhir/StructureDefinition/medication-request"]
        }
      };
      
      resolve(createdResource);
    }, 500);
  });
};

/**
 * Update an existing FHIR MedicationRequest
 * 
 * @param id The ID of the MedicationRequest to update
 * @param medicationRequest The updated MedicationRequest data
 * @returns Promise with the updated MedicationRequest
 */
export const updateFHIRMedicationRequest = async (
  id: string,
  medicationRequest: Partial<FHIRMedicationRequest>
): Promise<FHIRMedicationRequest> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Find the resource in our mock data
      const allPrescriptions = [
        ...activePrescriptions,
        ...pendingPrescriptions,
        ...expiredPrescriptions
      ];
      
      const prescription = allPrescriptions.find(p => p.id === id);
      
      if (!prescription) {
        reject(new Error(`MedicationRequest with ID ${id} not found`));
        return;
      }
      
      // Convert to FHIR, apply updates, and increment version
      const existingResource = convertToFHIRMedicationRequest(prescription);
      const updatedResource = {
        ...existingResource,
        ...medicationRequest,
        meta: {
          ...existingResource.meta,
          versionId: String(Number(existingResource.meta?.versionId || "0") + 1),
          lastUpdated: new Date().toISOString()
        }
      };
      
      resolve(updatedResource);
    }, 500);
  });
};

/**
 * Delete a FHIR MedicationRequest
 * 
 * @param id The ID of the MedicationRequest to delete
 * @returns Promise that resolves when deletion is complete
 */
export const deleteFHIRMedicationRequest = async (id: string): Promise<void> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // In a real implementation, this would call the FHIR server
      // For now, we'll just simulate success
      resolve();
    }, 500);
  });
};

/**
 * Validate a FHIR MedicationRequest against profiles
 * 
 * @param medicationRequest The MedicationRequest to validate
 * @returns Promise with validation results
 */
export const validateFHIRMedicationRequest = async (
  medicationRequest: FHIRMedicationRequest
): Promise<{isValid: boolean, issues?: Array<{severity: string, message: string}>}> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Basic validation logic - in real implementation this would validate against FHIR profiles
      const issues = [];
      
      if (!medicationRequest.status) {
        issues.push({
          severity: "error",
          message: "MedicationRequest must have a status"
        });
      }
      
      if (!medicationRequest.intent) {
        issues.push({
          severity: "error",
          message: "MedicationRequest must have an intent"
        });
      }
      
      if (!medicationRequest.subject) {
        issues.push({
          severity: "error",
          message: "MedicationRequest must have a subject"
        });
      }
      
      if (!medicationRequest.medicationCodeableConcept && !medicationRequest.medicationReference) {
        issues.push({
          severity: "error",
          message: "MedicationRequest must have either medicationCodeableConcept or medicationReference"
        });
      }
      
      resolve({
        isValid: issues.length === 0,
        issues: issues.length > 0 ? issues : undefined
      });
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
      return { label: "On Hold", color: "bg-yellow-100 text-yellow-800" };
    case "completed":
      return { label: "Completed", color: "bg-blue-100 text-blue-800" };
    case "cancelled":
      return { label: "Cancelled", color: "bg-red-100 text-red-800" };
    case "stopped":
      return { label: "Stopped", color: "bg-purple-100 text-purple-800" };
    case "entered-in-error":
      return { label: "Error", color: "bg-red-100 text-red-800" };
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
