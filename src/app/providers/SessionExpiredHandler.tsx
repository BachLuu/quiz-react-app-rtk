/**
 * SessionExpiredHandler Component
 *
 * Listens for session expired events from RTK Query baseQuery
 * and handles navigation without hard reload (preserves app state)
 *
 * This component is placed at the root of the app to ensure
 * it can intercept session expiration events globally.
 */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/features/auth/api";
import { useAppDispatch } from "@/stores/hooks";

export const SessionExpiredHandler = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    /**
     * Handle session expired event
     *
     * Flow:
     * 1. baseQuery detects refresh token failure
     * 2. Dispatches custom event 'auth:sessionExpired'
     * 3. This handler catches the event
     * 4. Clears RTK Query cache
     * 5. Navigates to login (soft navigation, no page reload)
     */
    const handleSessionExpired = (event: CustomEvent) => {
      const { redirectTo } = event.detail;

      console.log("[SessionExpiredHandler] Session expired, cleaning up...");

      // Clear RTK Query cache
      dispatch(authApi.util.resetApiState());

      // Navigate without hard reload (preserves Redux store structure)
      navigate(redirectTo, { replace: true });
    };

    // Register event listener
    window.addEventListener(
      "auth:sessionExpired" as any,
      handleSessionExpired as EventListener
    );

    // Cleanup
    return () => {
      window.removeEventListener(
        "auth:sessionExpired" as any,
        handleSessionExpired as EventListener
      );
    };
  }, [dispatch, navigate]);

  return null; // No UI
};
