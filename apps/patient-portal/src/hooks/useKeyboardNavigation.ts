import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardNavigation(shortcuts: KeyboardShortcut[]) {
  const router = useRouter();

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const matchingShortcut = shortcuts.find(shortcut => {
      return (
        event.key.toLowerCase() === shortcut.key.toLowerCase() &&
        !!shortcut.ctrlKey === event.ctrlKey &&
        !!shortcut.altKey === event.altKey &&
        !!shortcut.shiftKey === event.shiftKey
      );
    });

    if (matchingShortcut) {
      event.preventDefault();
      matchingShortcut.action();
    }
  }, [shortcuts]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Default shortcuts
  const defaultShortcuts: KeyboardShortcut[] = [
    {
      key: 'h',
      ctrlKey: true,
      action: () => router.push('/dashboard'),
      description: 'Go to Home'
    },
    {
      key: 'a',
      ctrlKey: true,
      action: () => router.push('/appointments'),
      description: 'Go to Appointments'
    },
    {
      key: 'r',
      ctrlKey: true,
      action: () => router.push('/records'),
      description: 'Go to Records'
    },
    {
      key: 'm',
      ctrlKey: true,
      action: () => router.push('/messages'),
      description: 'Go to Messages'
    },
    {
      key: 'p',
      ctrlKey: true,
      action: () => router.push('/profile'),
      description: 'Go to Profile'
    },
    {
      key: 'Escape',
      action: () => router.back(),
      description: 'Go Back'
    }
  ];

  return [...defaultShortcuts, ...shortcuts];
} 