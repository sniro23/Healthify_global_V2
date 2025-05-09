import * as React from 'react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  fallback,
  className = '',
  size = 'md',
  ...props
}) => {
  const [error, setError] = React.useState(false);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-8 w-8 text-xs';
      case 'lg':
        return 'h-12 w-12 text-base';
      case 'xl':
        return 'h-16 w-16 text-lg';
      default:
        return 'h-10 w-10 text-sm';
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-200 ${getSizeClasses()} ${className}`}
      {...props}
    >
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <span className="font-medium text-gray-600">
          {fallback || alt.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}; 