/**
 * useAuth Hook - Enterprise Edition
 *
 * Single Source of Truth: RTK Query cache
 * - Không dùng Redux authSlice nữa
 * - State được lấy trực tiếp từ RTK Query
 * - Error handling: chỉ hiển thị lỗi từ user actions, bỏ qua 401 từ /auth/me
 */

import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
} from "@/features/auth/api";
import type {
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest,
} from "@/features/auth/types";

/**
 * Main Auth Hook
 * Provides tất cả auth-related functionality
 */
export const useAuth = () => {
  const navigate = useNavigate();

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
    error: userError,
    refetch: refetchUser,
  } = useGetCurrentUserQuery();

  // --- Derived States ---

  // User is authenticated if getCurrentUser query returns data
  const isAuthenticated = !!user;

  // Combine loading states from mutations and query
  const isLoading = isLoginLoading || isRegisterLoading || isLoadingUser;

  // Filter errors: chỉ hiển thị lỗi từ mutations, bỏ qua 401 từ getCurrentUser
  const error = useMemo(() => {
    // Prioritize mutation errors (login/register)
    if (loginError) return loginError;
    if (registerError) return registerError;

    // Ignore 401 from getCurrentUser (normal state when not logged in)
    if (userError && "status" in userError && userError.status === 401) {
      return null;
    }

    // Show other errors from getCurrentUser (500, network errors, etc.)
    return userError || null;
  }, [loginError, registerError, userError]);

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
      navigate("/home");
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
      navigate("/home");
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
      // RTK Query tự động invalidate cache "User"
      // Redirect to login
      navigate("/login");
    }
  }, [logoutMutation, navigate]);

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
