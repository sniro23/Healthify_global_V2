import React from "react";
export interface LoginFormProps {
    onSubmit: (email: string, password: string) => Promise<void>;
    isLoading?: boolean;
    error?: string;
}
export declare function LoginForm({ onSubmit, isLoading, error }: LoginFormProps): React.JSX.Element;
//# sourceMappingURL=LoginForm.d.ts.map