import { useAccessibility } from '../providers/AccessibilityProvider';

export function AccessibilitySettings() {
  const {
    highContrast,
    fontSize,
    reducedMotion,
    toggleHighContrast,
    setFontSize,
    toggleReducedMotion,
  } = useAccessibility();

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">Accessibility Settings</h2>
      
      <div className="space-y-4">
        {/* High Contrast Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">High Contrast</h3>
            <p className="text-sm text-gray-500">Increase contrast for better readability</p>
          </div>
          <button
            onClick={toggleHighContrast}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
              highContrast ? 'bg-primary-600' : 'bg-gray-200'
            }`}
            role="switch"
            aria-checked={highContrast}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                highContrast ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Font Size Control */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">Font Size</h3>
          <div className="flex space-x-4">
            {(['normal', 'large', 'larger'] as const).map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  fontSize === size
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Reduced Motion Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Reduced Motion</h3>
            <p className="text-sm text-gray-500">Minimize animations and transitions</p>
          </div>
          <button
            onClick={toggleReducedMotion}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
              reducedMotion ? 'bg-primary-600' : 'bg-gray-200'
            }`}
            role="switch"
            aria-checked={reducedMotion}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                reducedMotion ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          These settings will be saved and applied across all pages. You can change them at any time.
        </p>
      </div>
    </div>
  );
} 