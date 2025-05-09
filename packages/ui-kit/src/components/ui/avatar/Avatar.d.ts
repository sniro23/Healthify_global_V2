import React from 'react';
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    src?: string;
    fallback?: string;
}
export declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>>;
export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
}
export declare const AvatarImage: React.ForwardRefExoticComponent<AvatarImageProps & React.RefAttributes<HTMLImageElement>>;
export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}
export declare const AvatarFallback: React.ForwardRefExoticComponent<AvatarFallbackProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Avatar.d.ts.map