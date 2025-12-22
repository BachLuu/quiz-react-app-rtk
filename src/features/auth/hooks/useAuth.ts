/**
 * useAuth Hook - Enterprise Edition
 *
 * Single Source of Truth: RTK Query cache
 * - Không dùng Redux authSlice nữa
 * - State được lấy trực tiếp từ RTK Query
 * - Error handling: chỉ hiển thị lỗi từ user actions, bỏ qua 401 từ /auth/me
 */

import {
  authApi,
  useGetCurrentUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
} from "@/features/auth/api";
import type {
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest,
} from "@/features/auth/types";
import { useAppDispatch } from "@/shared/stores/hooks";
import { useCallback, useMemo } from "react";
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
  const [updateProfileMutation, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();

  // --- RTK Query - Current User (Single Source of Truth) ---
  const {
    data: user,
    isLoading: isLoadingUser,
    refetch: refetchUser,
  } = useGetCurrentUserQuery();

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
   * TODO: Unlock comment in production
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
   * Update profile
   */
  const updateProfile = useCallback(
    async (profileData: UpdateProfileRequest) => {
      try {
        // Call API với RTK Query
        const updatedUser = await updateProfileMutation(profileData).unwrap();

        // RTK Query tự động update cache "User"
        return updatedUser;
      } catch (err) {
        throw err;
      }
    },
    [updateProfileMutation]
  );

  /**
   * Check if user has specific role
   */
  const hasRole = useCallback(
    (role: string): boolean => {
      return user?.roles?.includes(role) ?? false;
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
    isUpdatingProfile,
    error,

    // Actions
    login,
    register,
    logout,
    refetchUser,
    updateProfile,

    // Utilities
    hasRole,
    hasAnyRole,
  };
};
