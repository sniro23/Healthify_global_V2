import * as React from 'react';
import * as clsx from 'clsx';

// This is a simplified Dialog component
// In a real implementation, you would use something like @radix-ui/react-dialog

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        {children}
      </div>
    </div>
  );
}

export interface DialogTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogTrigger({ children, className }: DialogTriggerProps) {
  return <div className={className}>{children}</div>;
}

export interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogContent({ children, className }: DialogContentProps) {
  return <div className={clsx("space-y-4", className)}>{children}</div>;
}

export interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogHeader({ children, className }: DialogHeaderProps) {
  return <div className={clsx("space-y-2", className)}>{children}</div>;
}

export interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogTitle({ children, className }: DialogTitleProps) {
  return <h2 className={clsx("text-lg font-semibold", className)}>{children}</h2>;
}

export interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogDescription({ children, className }: DialogDescriptionProps) {
  return <div className={clsx("text-sm text-gray-500", className)}>{children}</div>;
}

export interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogFooter({ children, className }: DialogFooterProps) {
  return <div className={clsx("flex justify-end space-x-2 mt-4", className)}>{children}</div>;
} 