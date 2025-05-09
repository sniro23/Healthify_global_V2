import { BaseFHIRService } from '../base/BaseFHIRService';
import { FHIRCondition } from '../models/condition';
export declare class ConditionService extends BaseFHIRService {
    saveCondition(condition: FHIRCondition, userId: string): Promise<string>;
    getConditionsByPatient(patientId: string): Promise<FHIRCondition[]>;
    getConditionById(id: string): Promise<FHIRCondition | null>;
}
//# sourceMappingURL=ConditionService.d.ts.map