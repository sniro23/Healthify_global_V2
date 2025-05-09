import React from 'react';
import type { Condition } from '@healthify/fhir-types';
interface ConditionListProps {
    conditions: Condition[];
    title?: string;
    onViewDetails?: (id: string) => void;
}
export declare function ConditionList({ conditions, title, onViewDetails }: ConditionListProps): React.JSX.Element;
export {};
//# sourceMappingURL=ConditionList.d.ts.map