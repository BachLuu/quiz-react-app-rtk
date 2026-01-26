import type { Question, QuestionType } from "@/shared/types";
import type { QuestionOptionDetailResponse } from "./dtos";

export type { Question as QuestionSummary };

export type QuestionDialogMode = "create" | "edit" | "view";

export type QuestionFormMode = "create" | "edit" | "view";

export type QuestionFormInitialData = Partial<
  Pick<
    QuestionDetail,
    "id" | "content" | "questionType" | "isActive" | "options"
  >
>;

export type QuestionFormProps = {
  mode?: QuestionFormMode;
  initialData?: QuestionFormInitialData;
  detailData?: QuestionDetail;
  onSubmit?: (data: any) => Promise<void>;
  isSubmitting?: boolean;
  /** Whether data is being loaded (shows skeleton) */
  isLoadingData?: boolean;
  submitButtonText?: string;
  onCancel?: () => void;
};

export type DeleteQuestionDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  question?: Question | null;
  isDeleting?: boolean;
};

export type QuestionListProps = {
  questions?: {
    content: Question[];
    totalPages: number;
    totalElements: number;
  };
  isLoading?: boolean;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onEdit?: (question: Question) => void;
  onDelete?: (question: Question) => void;
  onView?: (question: Question) => void;
};

export type QuestionTableColumnId =
  | "index"
  | "content"
  | "questionType"
  | "status"
  | "actions";

export type QuestionTableSortableColumnId = Exclude<
  QuestionTableColumnId,
  "actions" | "index" | "status"
>;

export type QuestionManagementPageState = {
  formDialogOpen: boolean;
  deleteDialogOpen: boolean;
  dialogMode: QuestionDialogMode;
  selectedQuestionId: string | null;
  page: number;
  rowsPerPage: number;
};

/* UI Models */
export type QuestionDetail = {
  id: string;
  content: string;
  questionType: QuestionType;
  isActive: boolean;
  options: QuestionOptionDetailResponse[];
};
