import React from 'react';
export interface DialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: React.ReactNode;
}
export declare function Dialog({ open, onOpenChange, children }: DialogProps): React.JSX.Element | null;
export interface DialogTriggerProps {
    children: React.ReactNode;
    className?: string;
}
export declare function DialogTrigger({ children, className }: DialogTriggerProps): React.JSX.Element;
export interface DialogContentProps {
    children: React.ReactNode;
    className?: string;
}
export declare function DialogContent({ children, className }: DialogContentProps): React.JSX.Element;
export interface DialogHeaderProps {
    children: React.ReactNode;
    className?: string;
}
export declare function DialogHeader({ children, className }: DialogHeaderProps): React.JSX.Element;
export interface DialogTitleProps {
    children: React.ReactNode;
    className?: string;
}
export declare function DialogTitle({ children, className }: DialogTitleProps): React.JSX.Element;
export interface DialogDescriptionProps {
    children: React.ReactNode;
    className?: string;
}
export declare function DialogDescription({ children, className }: DialogDescriptionProps): React.JSX.Element;
export interface DialogFooterProps {
    children: React.ReactNode;
    className?: string;
}
export declare function DialogFooter({ children, className }: DialogFooterProps): React.JSX.Element;
//# sourceMappingURL=Dialog.d.ts.map