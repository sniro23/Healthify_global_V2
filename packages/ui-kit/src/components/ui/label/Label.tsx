import * as React from 'react';
import * as clsx from 'clsx';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className={clsx(
          "text-sm font-medium text-gray-700",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Label.displayName = "Label"; 