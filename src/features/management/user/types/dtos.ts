import type { Role } from "@/shared/types/role";

export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  dateOfBirth: string;
  roleIds: string[];
};

export type UpdateUserRequest = {
  firstName?: string;
  lastName?: string;
  password?: string;
  avatar?: string;
  dateOfBirth?: string;
  roleIds?: string[];
  isActive?: boolean;
};

export type UserDetailResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  dateOfBirth: string;
  isActive: boolean;
  createdAt: string;
  roles: Array<Role>;
  displayName: string;
};

export type UserSummaryResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  displayName: string;
  roles: Array<string>;
};
