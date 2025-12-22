/**
 * PublicRoute Component
 * Best practice: Routes chỉ dành cho unauthenticated users
 * Ví dụ: Login, Register pages - nếu đã login thì redirect về dashboard
 */

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth";

interface PublicRouteProps {
  /**
   * Redirect đến đâu nếu user đã authenticated
   * Default: /dashboard
   */
  redirectTo?: string;
}

/**
 * PublicRoute - Routes cho users chưa login
 * Nếu đã login sẽ redirect về dashboard
 *
 * Usage:
 * ```tsx
 * <Route element={<PublicRoute />}>
 *   <Route path="/login" element={<LoginPage />} />
 *   <Route path="/register" element={<RegisterPage />} />
 * </Route>
 * ```
 */
export const PublicRoute = ({ redirectTo = "/home" }: PublicRouteProps) => {
  const { isAuthenticated } = useAuth();

  // Nếu đã login, redirect về dashboard
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // User chưa login - render child routes
  return <Outlet />;
};
