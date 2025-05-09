import React from 'react';
interface Provider {
    name: string;
    specialty: string;
    phone: string;
    address?: string;
}
interface HealthcareProvidersData {
    primaryCare?: Provider;
    specialists?: Provider[];
}
interface HealthcareProvidersFormProps {
    data: HealthcareProvidersData;
    updateData: (data: HealthcareProvidersData) => void;
}
export default function HealthcareProvidersForm({ data, updateData }: HealthcareProvidersFormProps): React.JSX.Element;
export {};
//# sourceMappingURL=HealthcareProvidersForm.d.ts.map