import type { CreateQuizFormData } from "@/features/management/quiz/schemas/quiz.schema";
import type { Page } from "@/shared/types/page";

export type ManagementQuizDialogMode = "create" | "edit" | "view";
export type ManagementQuizFormMode = "create" | "edit" | "view";

// UI-facing list model (already normalized for rendering)
export type QuizSummary = {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbnailUrl: string;
  isActive: boolean;
};
export type UseQuizParams = {
  page: number;
  size: number;
};

// UI-facing detail model (includes counters)
export type QuizDetail = {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbnailUrl: string;
  isActive: boolean;
  totalQuestions: number;
  totalAttempts: number;
};

export type QuizFormValues = {
  id?: string;
  title: string;
  description: string;
  duration: number;
  thumbnailUrl: string;
  isActive: boolean;
};

export type QuizFormProps = {
  mode?: ManagementQuizFormMode;
  initialData?: Partial<QuizFormValues>;
  detailData?: QuizDetail;
  onSubmit?: (data: CreateQuizFormData) => Promise<void>;
  isSubmitting?: boolean;
  submitButtonText?: string;
  onCancel?: () => void;
};

export type QuizListProps = {
  quizzes?: Page<QuizSummary>;
  isLoading?: boolean;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onEdit?: (quiz: QuizSummary) => void;
  onDelete?: (quiz: QuizSummary) => void;
  onView?: (quiz: QuizSummary) => void;
};

export type QuizTableColumnId =
  | "index"
  | "title"
  | "description"
  | "duration"
  | "status"
  | "actions";

export type QuizTableSortableColumnId = Exclude<
  QuizTableColumnId,
  "actions" | "index"
>;
