import { useMemo } from "react";
import {
  IconButton,
  Chip,
  Typography,
  Skeleton,
  Tooltip,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataTable, type DataTableColumn } from "@/shared/components/table";
import type { Page } from "@/shared/types/page";
import type {
  UserSummary,
  UserTableColumnId,
  UserTableSortableColumnId,
} from "../types/ui";

export interface UserListProps {
  users?: Page<UserSummary>;
  isLoading?: boolean;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onEdit?: (user: UserSummary) => void;
  onDelete?: (user: UserSummary) => void;
  onView?: (user: UserSummary) => void;
}

/**
 * UserList Component
 * Displays a list of users in a table format with pagination
 */
export const UserList = ({
  users,
  isLoading = false,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  onView,
}: UserListProps) => {
  const columns: Array<
    DataTableColumn<UserSummary, UserTableColumnId, UserTableSortableColumnId>
  > = useMemo(
    () => [
      {
        id: "index",
        label: "#",
        align: "center",
        renderSkeleton: () => <Skeleton variant="text" width={24} />,
        render: (_user, rowIndex) => (rowIndex ?? 0) + 1,
      },
      {
        id: "firstName",
        label: "First Name",
        sortable: true,
        getSortValue: (user) => user.firstName,
        renderSkeleton: () => <Skeleton variant="text" width="80%" />,
        render: (user) => (
          <Typography variant="body2" fontWeight="medium">
            {user.firstName}
          </Typography>
        ),
      },
      {
        id: "lastName",
        label: "Last Name",
        sortable: true,
        getSortValue: (user) => user.lastName,
        renderSkeleton: () => <Skeleton variant="text" width="80%" />,
        render: (user) => (
          <Typography variant="body2">{user.lastName}</Typography>
        ),
      },
      {
        id: "email",
        label: "Email",
        sortable: true,
        getSortValue: (user) => user.email,
        renderSkeleton: () => <Skeleton variant="text" width="80%" />,
        render: (user) => (
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        ),
      },
      {
        id: "roles",
        label: "Roles",
        renderSkeleton: () => (
          <Stack direction="row" spacing={0.5}>
            <Skeleton variant="rounded" width={60} height={24} />
            <Skeleton variant="rounded" width={60} height={24} />
          </Stack>
        ),
        render: (user) => (
          <Stack direction="row" spacing={0.5} flexWrap="wrap">
            {user.roles.map((role, idx) => (
              <Chip key={idx} label={role} size="small" variant="outlined" />
            ))}
          </Stack>
        ),
      },
      {
        id: "status",
        label: "Status",
        sortable: false,
        renderSkeleton: () => (
          <Skeleton variant="rounded" width={70} height={24} />
        ),
        render: (user: UserSummary) => (
          <Chip
            label={user.isActive ? "Active" : "Inactive"}
            color={user.isActive ? "success" : "default"}
            size="small"
          />
        ),
      },
      {
        id: "actions",
        label: "Actions",
        align: "center",
        renderSkeleton: () => (
          <Stack direction="row" spacing={1} justifyContent="center">
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="circular" width={32} height={32} />
          </Stack>
        ),
        render: (user) => (
          <Stack direction="row" spacing={0.5} justifyContent="center">
            {onView && (
              <Tooltip title="View">
                <IconButton
                  size="small"
                  color="info"
                  onClick={() => onView(user)}
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {onEdit && (
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => onEdit(user)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onDelete(user)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        ),
      },
    ],
    [onDelete, onEdit, onView]
  );

  const rows = users?.content ?? [];
  const totalCount = users?.totalElements ?? 0;
  const totalPages = users?.totalPages ?? 0;

  return (
    <DataTable
      columns={columns}
      rows={rows}
      isLoading={isLoading}
      pagination={{
        page,
        rowsPerPage,
        count: totalCount,
        totalPages,
        onPageChange,
        onRowsPerPageChange,
      }}
    />
  );
};
