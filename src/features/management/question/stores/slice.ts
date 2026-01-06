import type { RootState } from "@/shared/stores";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  QuestionManagementUiState,
  OpenQuestionDeleteDialogPayload,
  OpenQuestionFormDialogPayload,
} from "./types";

const initialState: QuestionManagementUiState = {
  formDialogOpen: false,
  deleteDialogOpen: false,
  dialogMode: "create",
  selectedQuestionId: null,
  page: 0,
  rowsPerPage: 10,
};

const questionManagementUiSlice = createSlice({
  name: "questionManagementUi",
  initialState,
  reducers: {
    openFormDialog: (
      state,
      action: PayloadAction<OpenQuestionFormDialogPayload>
    ) => {
      state.formDialogOpen = true;
      state.dialogMode = action.payload.mode;
      state.selectedQuestionId = action.payload.questionId ?? null;
    },
    closeFormDialog: (state) => {
      state.formDialogOpen = false;
      state.selectedQuestionId = null;
    },
    openDeleteDialog: (
      state,
      action: PayloadAction<OpenQuestionDeleteDialogPayload>
    ) => {
      state.deleteDialogOpen = true;
      state.selectedQuestionId = action.payload.questionId;
    },
    closeDeleteDialog: (state) => {
      state.deleteDialogOpen = false;
      state.selectedQuestionId = null;
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
} = questionManagementUiSlice.actions;

// Selectors
export const selectQuestionManagementUi = (state: RootState) =>
  state.questionManagementUi;
export const selectQuestionManagementUiPage = (state: RootState) =>
  state.questionManagementUi.page;
export const selectQuestionManagementUiRowsPerPage = (state: RootState) =>
  state.questionManagementUi.rowsPerPage;
export const selectQuestionManagementUiFormDialogOpen = (state: RootState) =>
  state.questionManagementUi.formDialogOpen;
export const selectQuestionManagementUiDeleteDialogOpen = (state: RootState) =>
  state.questionManagementUi.deleteDialogOpen;
export const selectQuestionManagementUiDialogMode = (state: RootState) =>
  state.questionManagementUi.dialogMode;
export const selectQuestionManagementUiSelectedQuestionId = (
  state: RootState
) => state.questionManagementUi.selectedQuestionId;

export default questionManagementUiSlice.reducer;
