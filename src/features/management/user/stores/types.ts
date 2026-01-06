export type UserManagementDialogMode = "create" | "edit" | "view";

// Redux UI state shape
export type UserManagementUiState = {
  formDialogOpen: boolean;
  deleteDialogOpen: boolean;
  dialogMode: UserManagementDialogMode;
  selectedUserId: string | null;
  page: number; // 0-based page index for server pagination
  rowsPerPage: number;
};

// Action payloads
export type OpenUserFormDialogPayload = {
  mode: UserManagementDialogMode;
  userId: string | null;
};

export type OpenUserDeleteDialogPayload = {
  userId: string;
};
