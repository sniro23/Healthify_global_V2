import { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'larger';
  reducedMotion: boolean;
  toggleHighContrast: () => void;
  setFontSize: (size: 'normal' | 'large' | 'larger') => void;
  toggleReducedMotion: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [reducedMotion, setReducedMotion] = useState(false);

  // Load user preferences from localStorage
  useEffect(() => {
    const savedHighContrast = localStorage.getItem('highContrast');
    const savedFontSize = localStorage.getItem('fontSize');
    const savedReducedMotion = localStorage.getItem('reducedMotion');

    if (savedHighContrast) setHighContrast(savedHighContrast === 'true');
    if (savedFontSize) setFontSize(savedFontSize as 'normal' | 'large' | 'larger');
    if (savedReducedMotion) setReducedMotion(savedReducedMotion === 'true');
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('highContrast', String(highContrast));
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('reducedMotion', String(reducedMotion));

    // Apply high contrast
    document.documentElement.classList.toggle('high-contrast', highContrast);

    // Apply font size
    document.documentElement.style.fontSize = 
      fontSize === 'normal' ? '16px' : 
      fontSize === 'large' ? '18px' : '20px';

    // Apply reduced motion
    document.documentElement.classList.toggle('reduced-motion', reducedMotion);
  }, [highContrast, fontSize, reducedMotion]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const toggleReducedMotion = () => setReducedMotion(prev => !prev);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        fontSize,
        reducedMotion,
        toggleHighContrast,
        setFontSize,
        toggleReducedMotion,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
} 