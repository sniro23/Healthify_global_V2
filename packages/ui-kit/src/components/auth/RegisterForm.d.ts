import React from "react";
export interface RegisterFormProps {
    onSubmit: (name: string, email: string, password: string, userType: string) => Promise<void>;
    isLoading?: boolean;
    error?: string;
}
export declare function RegisterForm({ onSubmit, isLoading, error }: RegisterFormProps): React.JSX.Element;
//# sourceMappingURL=RegisterForm.d.ts.map