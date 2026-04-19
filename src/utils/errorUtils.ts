// Type guard utility for safe error handling
// Reusable across controllers without using 'any'

export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

// Helper to safely get error message
export const getErrorMessage = (error: unknown): string => {
  if (isError(error)) {
    return error.message;
  }
  return 'Unknown error occurred';
};
