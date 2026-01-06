import type { RootState } from "@/shared/stores";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  UserManagementUiState,
  OpenUserDeleteDialogPayload,
  OpenUserFormDialogPayload,
} from "./types";

const initialState: UserManagementUiState = {
  formDialogOpen: false,
  deleteDialogOpen: false,
  dialogMode: "create",
  selectedUserId: null,
  page: 0,
  rowsPerPage: 10,
};

const userManagementUiSlice = createSlice({
  name: "userManagementUi",
  initialState,
  reducers: {
    openFormDialog: (
      state,
      action: PayloadAction<OpenUserFormDialogPayload>
    ) => {
      state.formDialogOpen = true;
      state.dialogMode = action.payload.mode;
      state.selectedUserId = action.payload.userId ?? null;
    },
    closeFormDialog: (state) => {
      state.formDialogOpen = false;
      state.selectedUserId = null;
    },
    openDeleteDialog: (
      state,
      action: PayloadAction<OpenUserDeleteDialogPayload>
    ) => {
      state.deleteDialogOpen = true;
      state.selectedUserId = action.payload.userId;
    },
    closeDeleteDialog: (state) => {
      state.deleteDialogOpen = false;
      state.selectedUserId = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.page = 0; // reset page when page size changes
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
} = userManagementUiSlice.actions;

// Selectors
export const selectUserManagementUi = (state: RootState) =>
  state.userManagementUi;
export const selectUserManagementUiPage = (state: RootState) =>
  state.userManagementUi.page;
export const selectUserManagementUiRowsPerPage = (state: RootState) =>
  state.userManagementUi.rowsPerPage;
export const selectUserManagementUiFormDialogOpen = (state: RootState) =>
  state.userManagementUi.formDialogOpen;
export const selectUserManagementUiDeleteDialogOpen = (state: RootState) =>
  state.userManagementUi.deleteDialogOpen;
export const selectUserManagementUiDialogMode = (state: RootState) =>
  state.userManagementUi.dialogMode;
export const selectUserManagementUiSelectedUserId = (state: RootState) =>
  state.userManagementUi.selectedUserId;

export default userManagementUiSlice.reducer;
