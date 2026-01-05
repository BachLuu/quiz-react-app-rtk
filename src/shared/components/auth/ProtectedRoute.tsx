/**
 * ProtectedRoute Component
 * Best practice: Higher-Order Component để protect routes cần authentication
 */

import { useAuth } from "@/features/auth";
import type { ProtectedRouteProps } from "@/shared/types";
import { Box, CircularProgress } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * ProtectedRoute - Bảo vệ routes cần authentication
 *
 * Usage:
 * ```tsx
 * <Route element={<ProtectedRoute />}>
 *   <Route path="/dashboard" element={<Dashboard />} />
 * </Route>
 *
 * // With role-based access
 * <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
 *   <Route path="/admin" element={<AdminPanel />} />
 * </Route>
 * ```
 */
export const ProtectedRoute = ({
  redirectTo = "/login",
  allowedRoles,
  loadingFallback,
  forbiddenFallback,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, hasAnyRole } = useAuth();
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return (
      loadingFallback || (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )
    );
  }

  // Check authentication
  if (!isAuthenticated) {
    // Redirect to login, save current location để redirect back sau khi login
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRoles && allowedRoles.length > 0) {
    const hasPermission = hasAnyRole(allowedRoles);

    if (!hasPermission) {
      return forbiddenFallback || <Navigate to="/forbidden" replace />;
    }
  }

  // User is authenticated và có quyền - render child routes
  return <Outlet />;
};
