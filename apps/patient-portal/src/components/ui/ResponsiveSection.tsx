import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ResponsiveSectionProps {
  children: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
}

export function ResponsiveSection({
  children,
  title,
  description,
  actions,
  className = '',
  fullWidth = false,
  noPadding = false,
}: ResponsiveSectionProps) {
  return (
    <section
      className={cn(
        'border-b border-gray-200 last:border-b-0',
        !noPadding && 'p-4 md:p-6',
        className
      )}
    >
      {/* Section Header */}
      {(title || description || actions) && (
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              {title && (
                <h2 className="text-lg font-medium text-gray-900">{title}</h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-gray-500">{description}</p>
              )}
            </div>
            {actions && (
              <div className="flex flex-wrap items-center gap-2">{actions}</div>
            )}
          </div>
        </div>
      )}

      {/* Section Content */}
      <div
        className={cn(
          'space-y-4',
          fullWidth ? 'w-full' : 'max-w-3xl'
        )}
      >
        {children}
      </div>
    </section>
  );
} 