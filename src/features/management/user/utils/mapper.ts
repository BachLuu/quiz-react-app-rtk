import type { User } from "@/shared/types";
import type { Role } from "@/shared/types/role";
import type { UserDetailResponse } from "../types/dtos";
import type { UserDetail, UserSummary } from "../types/ui";

// Helper to normalize roles to Role[] format
const normalizeRoles = (roles: string[] | Role[]): Role[] => {
  if (roles.length === 0) return [];
  // Check if first element is string or Role object
  if (typeof roles[0] === "string") {
    return (roles as string[]).map((roleName) => ({
      id: roleName, // Use name as id when we only have string
      name: roleName,
      isActive: true, // Default to active when unknown
    }));
  }
  return roles as Role[];
};

// Map detail DTO -> UI model (works with both UserDetailResponse and User from shared)
export const mapToUserDetail = (
  userDetailResponse: UserDetailResponse | User
): UserDetail => ({
  id: userDetailResponse.id,
  firstName: userDetailResponse.firstName,
  lastName: userDetailResponse.lastName,
  email: userDetailResponse.email,
  avatar: userDetailResponse.avatar ?? "",
  dateOfBirth: userDetailResponse.dateOfBirth ?? "",
  isActive: userDetailResponse.isActive,
  createdAt: userDetailResponse.createdAt,
  roles: normalizeRoles(userDetailResponse.roles),
  displayName: userDetailResponse.displayName,
});

// Map user detail/summary to form values
export const mapUserToFormValues = (
  user?: UserSummary | UserDetail
):
  | {
      firstName: string;
      lastName: string;
      email: string;
      avatar: string;
      dateOfBirth: string;
      roleIds: string[];
      isActive: boolean;
    }
  | undefined => {
  if (!user) return undefined;

  // Extract role IDs - handle both string[] (User/UserSummary) and RoleSummary[] (UserDetail)
  const roleIds = user.roles.map((role: string | { name: string }) =>
    typeof role === "string" ? role : role.name
  );

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatar: ("avatar" in user ? user.avatar : "") ?? "",
    dateOfBirth: ("dateOfBirth" in user ? user.dateOfBirth : "") ?? "",
    roleIds,
    isActive: user.isActive,
  };
};
