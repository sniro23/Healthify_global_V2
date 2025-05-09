import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveCardProps {
  children: ReactNode;
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  actions?: ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export function ResponsiveCard({
  children,
  title,
  description,
  icon: Icon,
  actions,
  className = '',
  onClick,
  interactive = false,
}: ResponsiveCardProps) {
  const cardClasses = cn(
    'bg-white rounded-lg border border-gray-200',
    interactive && 'cursor-pointer hover:border-primary-500 hover:shadow-md transition-all',
    className
  );

  const content = (
    <>
      {/* Card Header */}
      {(title || description || Icon) && (
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-start">
            {Icon && (
              <div className="flex-shrink-0 mr-3">
                <Icon className="w-6 h-6 text-gray-400" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              {title && (
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {title}
                </h3>
              )}
              {description && (
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="px-4 py-3">
        {children}
      </div>

      {/* Card Actions */}
      {actions && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <div className="flex justify-end space-x-2">
            {actions}
          </div>
        </div>
      )}
    </>
  );

  if (interactive) {
    return (
      <button
        className={cardClasses}
        onClick={onClick}
        type="button"
      >
        {content}
      </button>
    );
  }

  return (
    <div className={cardClasses}>
      {content}
    </div>
  );
} 