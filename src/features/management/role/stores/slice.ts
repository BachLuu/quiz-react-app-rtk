import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/shared/stores";
import type {
  RoleManagementUiState,
  OpenFormDialogPayload,
  OpenDeleteDialogPayload,
} from "./types";

const initialState: RoleManagementUiState = {
  formDialogOpen: false,
  deleteDialogOpen: false,
  dialogMode: "create",
  selectedRoleId: null,
  page: 0,
  rowsPerPage: 10,
};

const roleManagementUiSlice = createSlice({
  name: "roleManagementUi",
  initialState,
  reducers: {
    openFormDialog: (state, action: PayloadAction<OpenFormDialogPayload>) => {
      state.formDialogOpen = true;
      state.dialogMode = action.payload.mode;
      state.selectedRoleId = action.payload.roleId;
    },
    closeFormDialog: (state) => {
      state.formDialogOpen = false;
      state.selectedRoleId = null;
    },
    openDeleteDialog: (
      state,
      action: PayloadAction<OpenDeleteDialogPayload>
    ) => {
      state.deleteDialogOpen = true;
      state.selectedRoleId = action.payload.roleId;
    },
    closeDeleteDialog: (state) => {
      state.deleteDialogOpen = false;
      state.selectedRoleId = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.page = 0; // Reset to first page when changing rows per page
    },
  },
});

export const {
  openFormDialog,
  closeFormDialog,
  openDeleteDialog,
  closeDeleteDialog,
  setPage,
  setRowsPerPage,
} = roleManagementUiSlice.actions;

// Granular selectors for re-render optimization
export const selectRoleManagementUiFormDialogOpen = (state: RootState) =>
  state.roleManagementUi.formDialogOpen;
export const selectRoleManagementUiDeleteDialogOpen = (state: RootState) =>
  state.roleManagementUi.deleteDialogOpen;
export const selectRoleManagementUiDialogMode = (state: RootState) =>
  state.roleManagementUi.dialogMode;
export const selectRoleManagementUiSelectedRoleId = (state: RootState) =>
  state.roleManagementUi.selectedRoleId;
export const selectRoleManagementUiPage = (state: RootState) =>
  state.roleManagementUi.page;
export const selectRoleManagementUiRowsPerPage = (state: RootState) =>
  state.roleManagementUi.rowsPerPage;

export default roleManagementUiSlice.reducer;
