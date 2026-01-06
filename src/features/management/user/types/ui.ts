import type { Role, User } from "@/shared/types";

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
  submitButtonText?: string;
  onCancel?: () => void;
};

export type UserListProps = {
  users?: UserDetail[];
  isLoading?: boolean;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onEdit?: (user: UserDetail) => void;
  onDelete?: (user: UserDetail) => void;
  onView?: (user: UserDetail) => void;
};

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
