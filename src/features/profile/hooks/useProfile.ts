import { useAuth } from "@/features/auth/hooks";
import type { UpdateProfileRequest } from "@/features/auth/types/dtos";
import { useCallback, useState } from "react";
import { useUpdateProfileMutation } from "../api";
import type { ProfileFormData } from "../schemas/profile.schema";
import type { ProfileMode } from "../types";
import {
  mapAuthUserToProfileForm,
  mapProfileFormToUpdateProfileRequest,
} from "../utils/mapper";

/**
 * useProfile Hook
 * Manages profile view/edit state and update logic
 */
export const useProfile = () => {
  const { user, refetchUser } = useAuth();
  const [updateProfileMutation, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const [mode, setMode] = useState<ProfileMode>("view");
  const [error, setError] = useState<string | null>(null);

  /**
   * Switch to edit mode
   */
  const startEditing = useCallback(() => {
    setMode("edit");
    setError(null);
  }, []);

  /**
   * Cancel editing and switch back to view mode
   */
  const cancelEditing = useCallback(() => {
    setMode("view");
    setError(null);
  }, []);

  /**
   * Save profile changes
   */
  const saveProfile = useCallback(
    async (data: ProfileFormData) => {
      if (!user?.id) return false;

      try {
        setError(null);
        await updateProfileMutation({
          userId: user.id,
          updateProfileRequest: mapProfileFormToUpdateProfileRequest(
            data,
            user.id
          ),
        });
        setMode("view");
        // Refetch user to ensure UI is in sync
        await refetchUser();
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update profile";
        setError(errorMessage);
        return false;
      }
    },
    [updateProfileMutation, refetchUser, user?.id]
  );

  /**
   * Get initial form values from current user
   */
  const getFormValues = useCallback((): ProfileFormData => {
    return mapAuthUserToProfileForm(user || null);
  }, [user]);

  /**
   * Update profile
   */
  const updateProfile = useCallback(
    async (profileData: UpdateProfileRequest) => {
      try {
        // Call API với RTK Query
        const updatedUser = await updateProfileMutation({
          userId: user?.id ?? "",
          updateProfileRequest: profileData,
        }).unwrap();

        return updatedUser;
      } catch (err) {
        throw err;
      }
    },
    [updateProfileMutation, user?.id]
  );

  return {
    // State
    user,
    mode,
    isUpdating: isUpdatingProfile,
    error,

    // Actions
    startEditing,
    cancelEditing,
    saveProfile,
    getFormValues,
    setMode,
    updateProfile,
  };
};
