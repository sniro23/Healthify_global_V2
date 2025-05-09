import * as React from 'react';
import * as clsx from 'clsx';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  className?: string;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={className}
        {...props}
      />
    );
  }
);
Form.displayName = "Form";

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx("space-y-2", className)}
        {...props}
      />
    );
  }
);
FormItem.displayName = "FormItem";

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={clsx("text-sm font-medium text-gray-700", className)}
        {...props}
      />
    );
  }
);
FormLabel.displayName = "FormLabel";

export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        {...props}
      />
    );
  }
);
FormControl.displayName = "FormControl";

export interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={clsx("text-sm text-gray-500", className)}
        {...props}
      />
    );
  }
);
FormDescription.displayName = "FormDescription";

export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={clsx("text-sm font-medium text-red-500", className)}
        {...props}
      />
    );
  }
);
FormMessage.displayName = "FormMessage"; 