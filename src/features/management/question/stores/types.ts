export type QuestionManagementDialogMode = "create" | "edit" | "view";

// Redux UI state shape
export type QuestionManagementUiState = {
  formDialogOpen: boolean;
  deleteDialogOpen: boolean;
  dialogMode: QuestionManagementDialogMode;
  selectedQuestionId: string | null;
  page: number; // 0-based page index for server pagination
  rowsPerPage: number;
};

// Action payloads
export type OpenQuestionFormDialogPayload = {
  mode: QuestionManagementDialogMode;
  questionId: string | null;
};

export type OpenQuestionDeleteDialogPayload = {
  questionId: string;
};
