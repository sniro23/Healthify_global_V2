/**
 * Simple logger utility for database operations
 */
export const logger = {
  info: (message: string, ...args: any[]) => {
    console.info(`[DB INFO] ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[DB ERROR] ${message}`, ...args);
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`[DB WARN] ${message}`, ...args);
  },
  debug: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DB DEBUG] ${message}`, ...args);
    }
  }
};
