import type { AuthUser, UpdateProfileRequest } from "@/features/auth/types";
import { api } from "@/shared/api/common/api";

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Update profile mutation
     */
    updateProfile: builder.mutation<
      AuthUser,
      { updateProfileRequest: UpdateProfileRequest; userId: string }
    >({
      query: ({ userId, updateProfileRequest }) => {
        const endpoint = `/users/${userId}`;

        return {
          url: endpoint,
          method: "PATCH",
          body: updateProfileRequest,
        };
      },
      invalidatesTags: (_result, _error, { userId }) => [
        { type: "User", id: userId },
        "Auth",
      ],
    }),
  }),
});

export const { useUpdateProfileMutation } = profileApi;
