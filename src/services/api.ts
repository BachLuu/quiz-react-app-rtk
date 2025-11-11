// src/services/api.ts
import { config } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Base Query Configuration
 * Automatically sends HTTP-only cookies with every request
 */
const baseQuery = fetchBaseQuery({
  baseUrl: config.api.baseURL,
  credentials: "include", // Send cookies automatically
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});
/**
 * Base Query with Re-authentication
 *
 * Handles token refresh and authentication errors:
 * 1. Silently handles 401/FETCH_ERROR for /auth/me (user not logged in)
 * 2. Attempts token refresh for 401 errors on protected endpoints
 * 3. Redirects to login if refresh fails
 * 4. Prevents infinite loops by skipping retry for auth endpoints
 */
const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  // Execute initial request
  let result = await baseQuery(args, api, extraOptions);

  // No error - return result immediately
  if (!result.error) {
    return result;
  }

  // Extract endpoint and error status
  const endpoint = getEndpoint(args);
  const { status } = result.error;

  // Special handling for /auth/me endpoint
  if (endpoint === "/auth/me") {
    // 401 or FETCH_ERROR = user not logged in (normal state, not an error)
    if (status === 401 || status === "FETCH_ERROR") {
      console.log("[Auth] User not authenticated - /auth/me returned 401");
      return { data: null }; // Return null instead of error
    }

    // Other errors (500, etc.) - return original error
    console.error("[Auth] /auth/me failed with error:", result.error);
    return result;
  }

  // Skip auth retry for auth endpoints to prevent infinite loops
  if (shouldSkipAuthRetry(endpoint)) {
    console.log(`[Auth] Skipping retry for auth endpoint: ${endpoint}`);
    return result;
  }

  // Handle 401 errors for protected endpoints
  if (status === 401) {
    console.log("[Auth] Access token expired, attempting refresh...");

    // Attempt to refresh token
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Refresh successful - retry original request
      console.log("[Auth] Token refresh successful, retrying request...");
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed - dispatch event for SessionExpiredHandler
      console.error(
        "[Auth] Token refresh failed, dispatching session expired event..."
      );

      // Dispatch custom event instead of hard navigation
      // SessionExpiredHandler component will handle navigation
      const event = new CustomEvent("auth:sessionExpired", {
        detail: { redirectTo: getLoginRedirectPath() },
      });
      window.dispatchEvent(event);
    }
  }

  // Handle network errors
  if (status === "FETCH_ERROR") {
    console.error("[Network] Request failed:", result.error);
  }

  return result;
};

/**
 * Base API - Parent của tất cả API services
 * Best practice: Define base API một lần, inject vào features
 */
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "User", "Quiz", "Question"], // Cache tags
  endpoints: () => ({}), // Empty - features sẽ inject endpoints
});

//-------------------Private Helpers Functions-------------------//
/**
 * Helper: Extract endpoint URL from args
 */
const getEndpoint = (args: any): string => {
  return typeof args === "string" ? args : args.url;
};

/**
 * Helper: Check if endpoint should skip auth retry to prevent infinite loops
 */
const shouldSkipAuthRetry = (endpoint: string): boolean => {
  const authEndpoints = [
    "/auth/login",
    "/auth/register",
    "/auth/refresh",
    "/auth/me",
  ];
  return authEndpoints.some((path) => endpoint.includes(path));
};

/**
 * Helper: Handle redirect to login with optional redirect parameter
 */
const getLoginRedirectPath = (): string => {
  const currentPath = window.location.pathname;
  return currentPath !== "/login"
    ? `/login?redirect=${encodeURIComponent(currentPath)}`
    : "/login";
};
