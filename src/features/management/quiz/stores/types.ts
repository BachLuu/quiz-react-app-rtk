import type { ManagementQuizDialogMode } from "../types/ui";

// Redux UI state shape
export type QuizUiState = {
  formDialogOpen: boolean;
  deleteDialogOpen: boolean;
  dialogMode: ManagementQuizDialogMode;
  selectedQuizId: string | null;
  page: number;
  rowsPerPage: number;
};

// Action payloads
export type OpenFormDialogPayload = {
  mode: ManagementQuizDialogMode;
  quizId?: string | null;
};

export type OpenDeleteDialogPayload = {
  quizId: string;
};
