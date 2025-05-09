import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ResponsiveNavProps {
  items: NavItem[];
  className?: string;
}

export function ResponsiveNav({ items, className }: ResponsiveNavProps) {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return (
      <div className={cn('flex justify-around items-center h-16 px-4', className)}>
        {items.map((item) => (
          <button
            key={item.href}
            onClick={() => router.push(item.href)}
            className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-primary-600 transition-colors"
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <nav className={cn('space-y-1 p-4', className)}>
      {items.map((item) => (
        <button
          key={item.href}
          onClick={() => router.push(item.href)}
          className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-primary-600 transition-colors"
        >
          <item.icon className="w-5 h-5 mr-3" />
          {item.label}
        </button>
      ))}
    </nav>
  );
} 