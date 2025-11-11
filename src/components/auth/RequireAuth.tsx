/**
 * RequireAuth Component
 * Best practice: Alternative approach - wrap individual components
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth";
import { Box, CircularProgress } from "@mui/material";

interface RequireAuthProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

/**
 * RequireAuth - Wrapper component cho protected content
 *
 * Usage:
 * ```tsx
 * <Route path="/dashboard" element={
 *   <RequireAuth allowedRoles={['USER', 'ADMIN']}>
 *     <Dashboard />
 *   </RequireAuth>
 * } />
 * ```
 */
export const RequireAuth = ({
  children,
  allowedRoles,
  redirectTo = "/login",
}: RequireAuthProps) => {
  const { isAuthenticated, isLoading, hasAnyRole } = useAuth();

  if (isLoading) {
    return (
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
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles && !hasAnyRole(allowedRoles)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <>{children}</>;
};
