/**
 * Role DTOs
 * Maps to backend Java DTOs
 */

// Request DTOs
export interface CreateRoleRequest {
  name: string;
  description: string;
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
  isActive?: boolean;
}

// Response DTOs
export interface RoleSummaryResponse {
  id: string;
  name: string;
  isActive: boolean;
}

export interface RoleDetailResponse {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}
