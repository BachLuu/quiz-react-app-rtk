/**
 * Type definitions for route components
 */

export interface ProtectedRouteProps {
  /**
   * Component sẽ render khi user chưa authenticate
   * Default: redirect to /login
   */
  redirectTo?: string;

  /**
   * Roles được phép access route này
   * Nếu undefined, chỉ cần authenticate là được
   */
  allowedRoles?: string[];

  /**
   * Custom fallback component khi loading
   */
  loadingFallback?: React.ReactNode;

  /**
   * Custom fallback component khi không có quyền
   */
  forbiddenFallback?: React.ReactNode;
}

export interface PublicRouteProps {
  /**
   * Redirect đến đâu nếu user đã authenticated
   * Default: /dashboard
   */
  redirectTo?: string;
}
