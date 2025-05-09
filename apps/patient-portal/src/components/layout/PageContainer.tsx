import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function PageContainer({
  children,
  title,
  description,
  actions,
  className = '',
  fullWidth = false,
}: PageContainerProps) {
  return (
    <div className={cn('min-h-full', className)}>
      {/* Page Header */}
      {(title || description || actions) && (
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
              )}
              {description && (
                <p className="mt-1 text-sm text-gray-500">{description}</p>
              )}
            </div>
            {actions && <div className="flex items-center space-x-4">{actions}</div>}
          </div>
        </div>
      )}

      {/* Page Content */}
      <div
        className={cn(
          'bg-white rounded-lg shadow-sm',
          fullWidth ? 'w-full' : 'max-w-7xl mx-auto'
        )}
      >
        {children}
      </div>
    </div>
  );
} 