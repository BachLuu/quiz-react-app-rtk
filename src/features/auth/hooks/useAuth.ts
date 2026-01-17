/**
 * useAuth Hook - Enterprise Edition
 *
 * Single Source of Truth: RTK Query cache + Redux store for userId
 * - State được lấy trực tiếp từ RTK Query
 * - userId được lưu vào Redux store để dùng toàn app (profile, etc.)
 * - Error handling: chỉ hiển thị lỗi từ user actions, bỏ qua 401 từ /auth/me
 */

import {
  authApi,
  useGetCurrentUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} from "@/features/auth/api";
import { clearUserId, setUserId } from "@/features/auth/stores/slice";
import type { LoginRequest, RegisterRequest } from "@/features/auth/types";
import { useAppDispatch } from "@/shared/stores/hooks";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Main Auth Hook
 * Provides tất cả auth-related functionality
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // --- RTK Query Mutations ---
  const [loginMutation, { isLoading: isLoginLoading, error: loginError }] =
    useLoginMutation();
  const [
    registerMutation,
    { isLoading: isRegisterLoading, error: registerError },
  ] = useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();

  // --- RTK Query - Current User (Single Source of Truth) ---
  const {
    data: user,
    isLoading: isLoadingUser,
    refetch: refetchUser,
  } = useGetCurrentUserQuery();

  // --- Sync userId to Redux store when user changes ---
  useEffect(() => {
    if (user?.id) {
      dispatch(setUserId({ userId: user.id }));
    } else {
      dispatch(clearUserId());
    }
  }, [user?.id, dispatch]);

  // --- Derived States ---

  // User is authenticated if getCurrentUser query returns data
  const isAuthenticated = !!user;

  // Combine loading states from mutations and query
  const isLoading = isLoginLoading || isRegisterLoading || isLoadingUser;

  // Filter errors: chỉ hiển thị lỗi từ mutations (Login/Register)
  // Không hiển thị lỗi từ getCurrentUser (/auth/me) ở đây vì:
  // 1. Lỗi 401/403 là trạng thái bình thường (chưa login)
  // 2. Lỗi 500/Network đã được AuthProvider xử lý (hoặc bỏ qua nếu ở trang Login)
  // 3. Tránh hiển thị thông báo lỗi đỏ lòm khi user vừa vào trang Login
  const error = useMemo(() => {
    if (loginError) return loginError;
    if (registerError) return registerError;
    return null;
  }, [loginError, registerError]);

  // --- Actions ---

  /**
   * Login function
   *
   * Flow:
   * 1. Call login API
   * 2. Backend sets HTTP-only cookie
   * 3. RTK Query invalidates 'User' tag
   * 4. AuthProvider (subscribed to getCurrentUser) auto-refetches
   * 5. Navigate to dashboard
   */
  const login = useCallback(
    async (credentials: LoginRequest) => {
      const response = await loginMutation(credentials).unwrap();
      return response;
    },
    [loginMutation, navigate]
  );

  /**
   * Register function
   *
   * Same flow as login
   */
  const register = useCallback(
    async (userData: RegisterRequest) => {
      const response = await registerMutation(userData).unwrap();
      return response;
    },
    [registerMutation, navigate]
  );

  /**
   * Logout function
   */
  const logout = useCallback(async () => {
    try {
      // Call API logout - server sẽ xóa HTTP-only cookie
      await logoutMutation().unwrap();
    } catch (err) {
      console.error("Logout API error:", err);
    } finally {
      dispatch(authApi.util.resetApiState());
      navigate("/login", { replace: true });
    }
  }, [dispatch, logoutMutation, navigate]);

  /**
   * Check if user has specific role
   */
  const hasRole = useCallback(
    (roleName: string): boolean => {
      if (!user?.roles) return false;
      return user.roles.some((role) =>
        typeof role === "string" ? role === roleName : role.name === roleName
      );
    },
    [user]
  );

  /**
   * Check if user has any of the specified roles
   */
  const hasAnyRole = useCallback(
    (roles: string[]): boolean => {
      return roles.some((role) => hasRole(role));
    },
    [hasRole]
  );

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    login,
    register,
    logout,
    refetchUser,

    // Utilities
    hasRole,
    hasAnyRole,
  };
};
