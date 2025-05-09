import { FHIRObservation } from '../../models/observation';
import { BaseFHIRService } from '../base/BaseFHIRService';
export declare class ObservationService extends BaseFHIRService {
    saveObservation(observation: FHIRObservation, userId: string): Promise<string>;
    getObservationsByPatient(patientId: string): Promise<FHIRObservation[]>;
    getObservationById(id: string): Promise<FHIRObservation | null>;
}
//# sourceMappingURL=ObservationService.d.ts.map