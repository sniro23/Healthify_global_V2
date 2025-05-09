import React from 'react';
import { z } from 'zod';
declare const schema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    dateOfBirth: z.ZodString;
    gender: z.ZodString;
    address: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    zipCode: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    phone: string;
    address: string;
    state: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    city: string;
    zipCode: string;
}, {
    email: string;
    phone: string;
    address: string;
    state: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    city: string;
    zipCode: string;
}>;
type FormData = z.infer<typeof schema>;
interface PersonalInfoFormProps {
    data: FormData;
    updateData: (data: FormData) => void;
}
export default function PersonalInfoForm({ data, updateData }: PersonalInfoFormProps): React.JSX.Element;
export {};
//# sourceMappingURL=PersonalInfoForm.d.ts.map