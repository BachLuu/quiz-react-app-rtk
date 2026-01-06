/**
 * Role API endpoints
 * Shared across all features
 */

import { api } from "../common/api";
import type { Page, PageParamsRequest, Role } from "@/shared/types";

export const roleApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get active roles
     * Backend: GET /api/roles/active
     */
    getActiveRoles: builder.query<Role[], void>({
      query: () => ({
        url: "/roles/active",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Role" as const,
                id,
              })),
              { type: "Role" as const, id: "ACTIVE_LIST" },
            ]
          : [{ type: "Role" as const, id: "ACTIVE_LIST" }],
    }),

    /**
     * Get paged roles
     * Backend: GET /api/roles/paged?page=0&size=10
     */
    getPagedRoles: builder.query<Page<Role>, PageParamsRequest>({
      query: ({ page, size }) => ({
        url: "/roles/paged",
        method: "GET",
        params: { page, size },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({
                type: "Role" as const,
                id,
              })),
              { type: "Role" as const, id: "PAGED_LIST" },
            ]
          : [{ type: "Role" as const, id: "PAGED_LIST" }],
    }),
  }),
});

export const {
  useGetActiveRolesQuery,
  useLazyGetActiveRolesQuery,
  useGetPagedRolesQuery,
  useLazyGetPagedRolesQuery,
} = roleApi;
