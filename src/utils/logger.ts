// Simple console-based logger utility
// No external logging libraries - keeping it minimal and interview-friendly

export const logger = {
  info: (message: string, ...args: any[]): void => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, ...args);
  },

  error: (message: string, ...args: any[]): void => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, ...args);
  },

  warn: (message: string, ...args: any[]): void => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, ...args);
  }
};
