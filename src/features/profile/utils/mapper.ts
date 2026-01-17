import type { AuthUser, UpdateProfileRequest } from "@/features/auth/types";
import type { ProfileFormData } from "../schemas";

/**
 * Map Profile Form Data to Update Profile Request
 */
export const mapProfileFormToUpdateProfileRequest = (
  data: ProfileFormData,
  userId: string
): UpdateProfileRequest & { userId: string } => {
  return {
    userId,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
    avatar: data.avatar,
  };
};

/**
 * Map Auth User to Profile Form Data
 */
export const mapAuthUserToProfileForm = (
  user: AuthUser | null
): ProfileFormData => {
  if (!user) {
    return {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      avatar: "",
    };
  }

  // Handle dateOfBirth formatting if needed (assuming backend returns ISO string)
  let dob = "";
  if (user.dateOfBirth) {
    try {
      // Check if it's already YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}$/.test(user.dateOfBirth)) {
        dob = user.dateOfBirth;
      } else {
        dob = new Date(user.dateOfBirth).toISOString().split("T")[0];
      }
    } catch {
      dob = user.dateOfBirth || "";
    }
  }

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    dateOfBirth: dob,
    avatar: user.avatar ?? "",
  };
};
