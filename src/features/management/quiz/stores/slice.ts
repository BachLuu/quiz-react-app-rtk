import type { RootState } from "@/shared/stores";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  OpenDeleteDialogPayload,
  OpenFormDialogPayload,
  QuizUiState as QuizManagementUiState,
} from "./types";

const initialState: QuizManagementUiState = {
  formDialogOpen: false,
  deleteDialogOpen: false,
  dialogMode: "create",
  selectedQuizId: null,
  page: 0,
  rowsPerPage: 10,
};

const quizManagementUiSlice = createSlice({
  name: "quizManagementUi",
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
//Actions
export const {
  openFormDialog,
  closeFormDialog,
  openDeleteDialog,
  closeDeleteDialog,
  setPage,
  setRowsPerPage,
} = quizManagementUiSlice.actions;

// Selectors
export const selectQuizManagementUiPage = (state: RootState) =>
  state.quizManagementUi.page;
export const selectQuizManagementUiRowsPerPage = (state: RootState) =>
  state.quizManagementUi.rowsPerPage;
export const selectQuizManagementUiFormDialogOpen = (state: RootState) =>
  state.quizManagementUi.formDialogOpen;
export const selectQuizManagementUiDeleteDialogOpen = (state: RootState) =>
  state.quizManagementUi.deleteDialogOpen;
export const selectQuizManagementUiDialogMode = (state: RootState) =>
  state.quizManagementUi.dialogMode;
export const selectQuizManagementUiSelectedQuizId = (state: RootState) =>
  state.quizManagementUi.selectedQuizId;

export default quizManagementUiSlice.reducer;
