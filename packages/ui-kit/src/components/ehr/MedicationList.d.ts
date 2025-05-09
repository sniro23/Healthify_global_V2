import React from 'react';
import type { MedicationRequest } from '@healthify/fhir-types';
interface MedicationListProps {
    medications: MedicationRequest[];
    title?: string;
    onViewDetails?: (id: string) => void;
}
export declare function MedicationList({ medications, title, onViewDetails }: MedicationListProps): React.JSX.Element;
export {};
//# sourceMappingURL=MedicationList.d.ts.map