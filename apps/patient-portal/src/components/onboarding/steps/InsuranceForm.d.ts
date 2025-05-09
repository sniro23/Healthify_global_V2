import React from 'react';
interface InsuranceData {
    provider?: string;
    policyNumber?: string;
    groupNumber?: string;
    primaryInsured?: string;
    relationshipToPrimary?: string;
    startDate?: string;
    coverageType?: string;
}
interface InsuranceFormProps {
    data: InsuranceData;
    updateData: (data: InsuranceData) => void;
}
export default function InsuranceForm({ data, updateData }: InsuranceFormProps): React.JSX.Element;
export {};
//# sourceMappingURL=InsuranceForm.d.ts.map