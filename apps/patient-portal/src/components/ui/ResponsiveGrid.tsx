import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ResponsiveGridProps {
  children: ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ResponsiveGrid({
  children,
  columns = { sm: 1, md: 2, lg: 3 },
  gap = 'md',
  className,
}: ResponsiveGridProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  const columnClasses = {
    sm: `grid-cols-${columns.sm || 1}`,
    md: `md:grid-cols-${columns.md || 2}`,
    lg: `lg:grid-cols-${columns.lg || 3}`,
    xl: columns.xl ? `xl:grid-cols-${columns.xl}` : '',
  };

  return (
    <div
      className={cn(
        'grid',
        gapClasses[gap],
        columnClasses.sm,
        columnClasses.md,
        columnClasses.lg,
        columnClasses.xl,
        className
      )}
    >
      {children}
    </div>
  );
} 