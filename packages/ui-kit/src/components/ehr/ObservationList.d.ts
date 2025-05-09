import React from 'react';
import type { Observation } from '@healthify/fhir-types';
interface ObservationListProps {
    observations: Observation[];
    title?: string;
    onViewDetails?: (id: string) => void;
}
export declare function ObservationList({ observations, title, onViewDetails }: ObservationListProps): React.JSX.Element;
export {};
//# sourceMappingURL=ObservationList.d.ts.map