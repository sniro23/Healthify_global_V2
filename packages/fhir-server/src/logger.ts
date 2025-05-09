/**
 * Simple logging utility for the FHIR server
 */
const logger = {
  info: (message: string, context?: any) => {
    console.log(`[INFO] ${message}`, context || '');
  },
  
  error: (message: string, context?: any) => {
    console.error(`[ERROR] ${message}`, context || '');
  },
  
  warn: (message: string, context?: any) => {
    console.warn(`[WARN] ${message}`, context || '');
  },
  
  debug: (message: string, context?: any) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] ${message}`, context || '');
    }
  }
};

export default logger; 