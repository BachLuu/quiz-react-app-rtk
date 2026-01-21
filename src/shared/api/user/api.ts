/**
 * User API endpoints
 * Shared across all features
 */

import { api } from "../common/api";
import type { Page, User } from "@/shared/types";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get single user by ID
     * Shared endpoint - used by profile, user management, etc.
     */
    getUserById: builder.query<User, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),

    /**
     * Get paged users
     * Provides tag "User" for automatic cache invalidation
     * Shared endpoint - can be used by any feature
     */
    getPagedUsers: builder.query<Page<User>, { page: number; size: number }>({
      query: ({ page, size }) => ({
        url: `/users/paged?page=${page}&size=${size}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({
                type: "User" as const,
                id,
              })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useGetPagedUsersQuery,
  useLazyGetPagedUsersQuery,
} = userApi;
