import { ReactNode } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ResponsiveLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function ResponsiveLayout({
  children,
  sidebar,
  header,
  footer,
  className = '',
}: ResponsiveLayoutProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {/* Header */}
      {header && (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          {header}
        </header>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar - Hidden on mobile, shown as bottom nav */}
        {!isMobile && sidebar && (
          <aside className="w-64 border-r border-gray-200 bg-white">
            {sidebar}
          </aside>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className={`mx-auto ${isTablet ? 'max-w-3xl' : 'max-w-4xl'}`}>
            {children}
          </div>
        </main>
      </div>

      {/* Footer or Mobile Navigation */}
      {isMobile ? (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          {sidebar}
        </nav>
      ) : (
        footer && (
          <footer className="bg-white border-t border-gray-200">
            {footer}
          </footer>
        )
      )}

      {/* Bottom padding for mobile to account for fixed navigation */}
      {isMobile && <div className="h-16" />}
    </div>
  );
} 