import type { RoleDialogMode } from "../types/ui";

export interface RoleManagementUiState {
  formDialogOpen: boolean;
  deleteDialogOpen: boolean;
  dialogMode: RoleDialogMode;
  selectedRoleId: string | null;
  page: number;
  rowsPerPage: number;
}

export interface OpenFormDialogPayload {
  mode: RoleDialogMode;
  roleId: string | null;
}

export interface OpenDeleteDialogPayload {
  roleId: string;
}
