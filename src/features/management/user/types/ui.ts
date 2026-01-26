import type { Page, Role, User } from "@/shared/types";
import type { UserSummary } from ".";

export type { User as UserSummary };

export type UserDialogMode = "create" | "edit" | "view";

export type UserFormMode = "create" | "edit" | "view";

export type UserFormInitialData = Partial<
  Pick<
    UserDetail,
    | "id"
    | "firstName"
    | "lastName"
    | "email"
    | "avatar"
    | "dateOfBirth"
    | "roles"
    | "isActive"
  >
>;

export type UserFormProps = {
  mode?: UserFormMode;
  initialData?: UserFormInitialData;
  detailData?: UserDetail;
  onSubmit?: (data: any) => Promise<void>;
  isSubmitting?: boolean;
  /** Whether data is being loaded (shows skeleton) */
  isLoadingData?: boolean;
  submitButtonText?: string;
  onCancel?: () => void;
};

export type UserListProps = {
  users?: Page<UserSummary>;
  isLoading?: boolean;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onEdit?: (user: UserSummary) => void;
  onDelete?: (user: UserSummary) => void;
  onView?: (user: UserSummary) => void;
};

export type DeleteUserDialogProps = {
   open: boolean;
  /** The user to delete */
  user: UserSummary | null;
  /** Whether delete is in progress */
  isDeleting?: boolean;
  /** Callback when dialog is closed */
  onClose: () => void;
  /** Callback when delete is confirmed */
  onConfirm: () => void; 
}

export type UserTableColumnId =
  | "index"
  | "firstName"
  | "lastName"
  | "email"
  | "status"
  | "roles"
  | "actions";

export type UserTableSortableColumnId = Exclude<
  UserTableColumnId,
  "actions" | "index" | "status" | "roles"
>;

export type UserManagementPageState = {
  formDialogOpen: boolean;
  deleteDialogOpen: boolean;
  dialogMode: UserDialogMode;
  selectedUserId: string | null;
  page: number;
  rowsPerPage: number;
};

/* UI Models */
export type UserDetail = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  dateOfBirth: string;
  roles: Role[];
  isActive: boolean;
  createdAt: string;
  displayName: string;
};
