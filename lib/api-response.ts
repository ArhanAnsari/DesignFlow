/**
 * API Response Utilities
 * Standardized error and success responses for API endpoints
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  code?: string;
  timestamp?: string;
}

/**
 * Success response builder
 */
export const successResponse = <T>(
  data: T,
  message?: string
): ApiResponse<T> => ({
  success: true,
  data,
  message,
  timestamp: new Date().toISOString(),
});

/**
 * Error response builder
 */
export const errorResponse = (
  error: string | Error,
  code?: string
): ApiResponse => ({
  success: false,
  error: error instanceof Error ? error.message : error,
  code: code || "UNKNOWN_ERROR",
  timestamp: new Date().toISOString(),
});

/**
 * Handle async API route with error catching
 */
export const asyncHandler =
  (fn: Function) => async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error("API Error:", error);
      return errorResponse(error instanceof Error ? error : "Internal server error");
    }
  };
