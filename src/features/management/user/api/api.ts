import { api } from "@/shared/api";
import type {
  UserDetailResponse,
  CreateUserRequest,
  UpdateUserRequest,
} from "../types";

const userManagementApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Create new user
     * Invalidates "User" list cache after successful creation
     */
    createUser: builder.mutation<UserDetailResponse, CreateUserRequest>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    /**
     * Update existing user
     * Invalidates both the specific user and the list cache
     */
    updateUser: builder.mutation<
      UserDetailResponse,
      { id: string; data: UpdateUserRequest }
    >({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    /**
     * Delete user by ID
     * Invalidates "User" list cache after successful deletion
     */
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userManagementApi;
