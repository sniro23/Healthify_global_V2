import { BaseFHIRService } from './BaseFHIRService';
import { FHIRMedicationRequest } from '../models/medicationRequest';
export declare class MedicationRequestService extends BaseFHIRService {
    private auditService;
    constructor();
    /**
     * Save a medication request to the database
     * @param medicationRequest The medication request to save
     * @param userId The user performing the operation
     * @returns The saved medication request
     */
    saveMedicationRequest(medicationRequest: FHIRMedicationRequest, userId: string): Promise<FHIRMedicationRequest>;
    /**
     * Get medication requests for a specific patient
     * @param patientId The patient ID
     * @returns Array of medication requests
     */
    getMedicationRequestsByPatient(patientId: string): Promise<FHIRMedicationRequest[]>;
    /**
     * Get a specific medication request by ID
     * @param id The FHIR ID of the medication request
     * @returns The medication request or null if not found
     */
    getMedicationRequestById(id: string): Promise<FHIRMedicationRequest | null>;
}
//# sourceMappingURL=MedicationRequestService.d.ts.map