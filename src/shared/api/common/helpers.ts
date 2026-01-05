/**
 * API Helper Functions
 * Utility functions for baseQuery and authentication flow
 */

/**
 * Extract endpoint URL from RTK Query args
 */
export const getEndpoint = (args: any): string => {
  return typeof args === "string" ? args : args.url;
};

/**
 * Check if endpoint should skip auth retry to prevent infinite loops
 */
export const shouldSkipAuthRetry = (endpoint: string): boolean => {
  const authEndpoints = [
    "/auth/login",
    "/auth/register",
    "/auth/refresh",
    "/auth/me",
  ];
  return authEndpoints.some((path) => endpoint.includes(path));
};

/**
 * Generate login redirect path with optional redirect parameter
 */
export const getLoginRedirectPath = (): string => {
  const currentPath = window.location.pathname;
  return currentPath !== "/login"
    ? `/login?redirect=${encodeURIComponent(currentPath)}`
    : "/login";
};
