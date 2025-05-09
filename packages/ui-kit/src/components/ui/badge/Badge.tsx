import * as React from 'react';
import * as clsx from 'clsx';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'destructive' | 'outline' | 'warning';
  className?: string;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: "bg-health-primary text-white",
      secondary: "bg-gray-100 text-gray-900",
      success: "bg-green-100 text-green-800",
      destructive: "bg-red-100 text-red-800",
      warning: "bg-yellow-100 text-yellow-800",
      outline: "bg-transparent border border-gray-200 text-gray-800",
    };

    return (
      <div
        ref={ref}
        className={clsx(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge"; 