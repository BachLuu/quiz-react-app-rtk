import type { RootState } from "@/shared/stores";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  OpenDeleteDialogPayload,
  OpenFormDialogPayload,
  QuizUiState as ManagementQuizUiState,
} from "./types";

const initialState: ManagementQuizUiState = {
  formDialogOpen: false,
  deleteDialogOpen: false,
  dialogMode: "create",
  selectedQuizId: null,
  page: 0,
  rowsPerPage: 10,
};

const managementQuizUiSlice = createSlice({
  name: "managmentQuizUi",
  initialState,
  reducers: {
    openFormDialog: (state, action: PayloadAction<OpenFormDialogPayload>) => {
      state.formDialogOpen = true;
      state.dialogMode = action.payload.mode;
      state.selectedQuizId = action.payload.quizId ?? null;
    },
    closeFormDialog: (state) => {
      state.formDialogOpen = false;
      state.selectedQuizId = null;
    },
    openDeleteDialog: (
      state,
      action: PayloadAction<OpenDeleteDialogPayload>
    ) => {
      state.deleteDialogOpen = true;
      state.selectedQuizId = action.payload.quizId;
    },
    closeDeleteDialog: (state) => {
      state.deleteDialogOpen = false;
      state.selectedQuizId = null;
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
} = managementQuizUiSlice.actions;

// Selectors
export const selectQuizUi = (state: RootState) => state.managementQuizUi;
export const selectQuizUiPage = (state: RootState) =>
  state.managementQuizUi.page;
export const selectQuizUiRowsPerPage = (state: RootState) =>
  state.managementQuizUi.rowsPerPage;
export const selectQuizUiFormDialogOpen = (state: RootState) =>
  state.managementQuizUi.formDialogOpen;
export const selectQuizUiDeleteDialogOpen = (state: RootState) =>
  state.managementQuizUi.deleteDialogOpen;
export const selectQuizUiDialogMode = (state: RootState) =>
  state.managementQuizUi.dialogMode;
export const selectQuizUiSelectedQuizId = (state: RootState) =>
  state.managementQuizUi.selectedQuizId;

export default managementQuizUiSlice.reducer;
