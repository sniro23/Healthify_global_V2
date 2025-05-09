import React from 'react';
export interface SelectOption {
    value: string;
    label: string;
}
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: SelectOption[];
    label?: string;
    error?: string;
    isMulti?: boolean;
}
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
//# sourceMappingURL=Select.d.ts.map