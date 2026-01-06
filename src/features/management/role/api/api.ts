/**
 * Role feature-specific API endpoints
 * For CRUD operations on individual roles
 */

import { api } from "@/shared/api/common/api";
import type {
  CreateRoleRequest,
  UpdateRoleRequest,
  RoleDetailResponse,
} from "../types/dtos";

export const roleFeatureApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get role by ID
     * Backend: GET /api/roles/{id}
     */
    getRoleById: builder.query<RoleDetailResponse, string>({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Role", id }],
    }),

    /**
     * Create role
     * Backend: POST /api/roles
     */
    createRole: builder.mutation<RoleDetailResponse, CreateRoleRequest>({
      query: (data) => ({
        url: "/roles",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        { type: "Role", id: "PAGED_LIST" },
        { type: "Role", id: "ACTIVE_LIST" },
      ],
    }),

    /**
     * Update role
     * Backend: PUT /api/roles/{id}
     */
    updateRole: builder.mutation<
      RoleDetailResponse,
      { id: string; data: UpdateRoleRequest }
    >({
      query: ({ id, data }) => ({
        url: `/roles/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Role", id },
        { type: "Role", id: "PAGED_LIST" },
        { type: "Role", id: "ACTIVE_LIST" },
      ],
    }),

    /**
     * Delete role
     * Backend: DELETE /api/roles/{id}
     */
    deleteRole: builder.mutation<void, string>({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Role", id },
        { type: "Role", id: "PAGED_LIST" },
        { type: "Role", id: "ACTIVE_LIST" },
      ],
    }),
  }),
});

export const {
  useGetRoleByIdQuery,
  useLazyGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleFeatureApi;
