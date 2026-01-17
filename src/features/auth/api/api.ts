/**
 * Auth API Endpoints
 * Best practice: Inject endpoints vào base API từ services/api.ts
 */

import { api } from "@/shared/api/common/api";
import type {
  AuthResponse,
  AuthUser,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from "../types";

/**
 * Auth API với RTK Query
 * Inject endpoints vào base API
 */
export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Login mutation
     */
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    /**
     * Register mutation
     */
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),

    /**
     * Refresh token mutation
     * Refresh token được gửi qua HTTP-only cookie, không cần body
     */
    refresh: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),

    /**
     * Get current user query
     */
    getCurrentUser: builder.query<AuthUser, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    /**
     * Logout mutation
     */
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

    /**
     * Change password mutation
     */
    changePassword: builder.mutation<void, ChangePasswordRequest>({
      query: (passwordData) => ({
        url: "/auth/change-password",
        method: "POST",
        body: passwordData,
      }),
    }),

    /**
     * Forgot password mutation
     */
    forgotPassword: builder.mutation<
      { message: string },
      ForgotPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    /**
     * Reset password mutation
     */
    resetPassword: builder.mutation<void, ResetPasswordRequest>({
      query: (resetData) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: resetData,
      }),
    }),
  }),
});

/**
 * Export hooks
 */
export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
