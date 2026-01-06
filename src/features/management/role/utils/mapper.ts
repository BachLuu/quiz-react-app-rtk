import type { Role } from "@/shared/types";
import type { RoleDetailResponse } from "../types/dtos";
import type { RoleDetail, RoleFormInitialData } from "../types/ui";

// Map detail DTO -> UI model
export const mapToRoleDetail = (
  roleDetailResponse: RoleDetailResponse
): RoleDetail => ({
  id: roleDetailResponse.id,
  name: roleDetailResponse.name,
  description: roleDetailResponse.description,
  isActive: roleDetailResponse.isActive,
});

// Map role detail/summary to form values
export const mapRoleToFormValues = (
  role?: Role | RoleDetail | null
): RoleFormInitialData | undefined => {
  if (!role) return undefined;

  return {
    id: role.id,
    name: role.name,
    isActive: role.isActive,
    // Only RoleDetail has description
    description: "description" in role ? role.description : undefined,
  };
};
