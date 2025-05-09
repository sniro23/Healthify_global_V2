import React from 'react';
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    className?: string;
}
export declare const Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>>;
export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}
export declare const FormItem: React.ForwardRefExoticComponent<FormItemProps & React.RefAttributes<HTMLDivElement>>;
export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    className?: string;
}
export declare const FormLabel: React.ForwardRefExoticComponent<FormLabelProps & React.RefAttributes<HTMLLabelElement>>;
export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}
export declare const FormControl: React.ForwardRefExoticComponent<FormControlProps & React.RefAttributes<HTMLDivElement>>;
export interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    className?: string;
}
export declare const FormDescription: React.ForwardRefExoticComponent<FormDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
    className?: string;
}
export declare const FormMessage: React.ForwardRefExoticComponent<FormMessageProps & React.RefAttributes<HTMLParagraphElement>>;
//# sourceMappingURL=Form.d.ts.map