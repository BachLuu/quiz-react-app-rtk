/**
 * User API endpoints
 * Shared across all features
 */

import { api } from "../common/api";
import type { Page, User } from "@/shared/types";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useGetPagedUsersQuery, useLazyGetPagedUsersQuery } = userApi;
