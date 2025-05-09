import * as React from 'react';
import * as clsx from 'clsx';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  src?: string;
  fallback?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = 'md', src, fallback, ...props }, ref) => {
    const sizes = {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-14 w-14"
    };
    
    return (
      <div
        ref={ref}
        className={clsx(
          "relative flex shrink-0 overflow-hidden rounded-full",
          sizes[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img 
            src={src} 
            alt="Avatar" 
            className="h-full w-full object-cover"
          />
        ) : fallback ? (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-800">
            {fallback}
          </div>
        ) : null}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, ...props }, ref) => {
    return (
      <img
        ref={ref}
        className={clsx("aspect-square h-full w-full", className)}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = "AvatarImage";

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-800",
          className
        )}
        {...props}
      />
    );
  }
);
AvatarFallback.displayName = "AvatarFallback"; 