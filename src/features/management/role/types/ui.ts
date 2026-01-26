import type { Role } from "@/shared/types";

export type { Role as RoleSummary };

export type RoleDialogMode = "create" | "edit" | "view";

export type RoleFormMode = "create" | "edit" | "view";

export type RoleFormInitialData = Partial<
  Pick<RoleDetail, "id" | "name" | "description" | "isActive">
>;

export interface RoleFormProps {
  mode?: RoleFormMode;
  initialData?: RoleFormInitialData;
  detailData?: RoleDetail;
  onSubmit?: (data: any) => Promise<void>;
  isSubmitting?: boolean;
  /** Whether data is being loaded (shows skeleton) */
  isLoadingData?: boolean;
  submitButtonText?: string;
  onCancel?: () => void;
}

export interface DeleteRoleDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  role?: Role | null;
  isDeleting?: boolean;
}

export interface RoleListProps {
  roles?: { content: Role[]; totalPages: number; totalElements: number };
  isLoading?: boolean;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onEdit?: (role: Role) => void;
  onDelete?: (role: Role) => void;
  onView?: (role: Role) => void;
}

export type RoleTableColumnId = "index" | "name" | "status" | "actions";

export type RoleTableSortableColumnId = Exclude<
  RoleTableColumnId,
  "actions" | "index" | "status"
>;

export interface RoleManagementPageState {
  formDialogOpen: boolean;
  deleteDialogOpen: boolean;
  dialogMode: RoleDialogMode;
  selectedRoleId: string | null;
  page: number;
  rowsPerPage: number;
}

/* UI Models */
export interface RoleDetail {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}
