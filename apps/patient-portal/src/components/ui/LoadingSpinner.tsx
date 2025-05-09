import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'primary',
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const colorClasses = {
    primary: 'border-[#9D5A8F]',
    white: 'border-white',
    gray: 'border-gray-400'
  };

  return (
    <div className={cn(
      'animate-spin rounded-full border-2 border-t-transparent',
      sizeClasses[size],
      colorClasses[color],
      className
    )} />
  );
} 