import type { UserDetailResponse } from "../types/dtos";
import type { UserDetail, UserSummary } from "../types/ui";

// Map detail DTO -> UI model
export const mapToUserDetail = (
  userDetailResponse: UserDetailResponse
): UserDetail => ({
  id: userDetailResponse.id,
  firstName: userDetailResponse.firstName,
  lastName: userDetailResponse.lastName,
  email: userDetailResponse.email,
  avatar: userDetailResponse.avatar,
  dateOfBirth: userDetailResponse.dateOfBirth,
  isActive: userDetailResponse.isActive,
  createdAt: userDetailResponse.createdAt,
  roles: userDetailResponse.roles,
  displayName: userDetailResponse.displayName,
});

// Map user detail/summary to form values
export const mapUserToFormValues = (
  user?: UserSummary | UserDetail
): {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  dateOfBirth: string;
  roleIds: string[];
  isActive: boolean;
} | undefined => {
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
