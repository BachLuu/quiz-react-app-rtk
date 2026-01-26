import { useMemo } from "react";
import { Box, Chip, IconButton, Skeleton, Stack, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  DataTable,
  type DataTableColumn,
} from "@/shared/components/table/DataTable";
import type { Role } from "@/shared/types";
import type {
  RoleListProps,
  RoleTableColumnId,
  RoleTableSortableColumnId,
} from "../types";

/**
 * RoleList Component
 * Displays roles in a paginated table
 */
export const RoleList = ({
  roles,
  isLoading = false,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onView,
  onEdit,
  onDelete,
}: RoleListProps) => {
  const columns: DataTableColumn<
    Role,
    RoleTableColumnId,
    RoleTableSortableColumnId
  >[] = useMemo(
    () => [
      {
        id: "index",
        label: "#",
        sortable: false,
        renderSkeleton: () => <Skeleton variant="text" width={24} />,
        render: (_row, rowIndex) => {
          // Calculate global index based on current page and row position
          const globalIndex = page * rowsPerPage + (rowIndex ?? 0) + 1;
          return globalIndex;
        },
      },
      {
        id: "name",
        label: "Name",
        sortable: true,
        getSortValue: (role) => role.name,
        renderSkeleton: () => <Skeleton variant="text" width="80%" />,
        render: (role) => (
          <Box
            sx={{
              fontWeight: 500,
            }}
          >
            {role.name}
          </Box>
        ),
      },
      {
        id: "status",
        label: "Status",
        sortable: false,
        renderSkeleton: () => (
          <Skeleton variant="rounded" width={70} height={24} />
        ),
        render: (role) => (
          <Chip
            label={role.isActive ? "Active" : "Inactive"}
            color={role.isActive ? "success" : "default"}
            size="small"
          />
        ),
      },
      {
        id: "actions",
        label: "Actions",
        sortable: false,
        renderSkeleton: () => (
          <Stack direction="row" spacing={1} justifyContent="center">
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="circular" width={32} height={32} />
          </Stack>
        ),
        render: (role) => (
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {onView && (
              <Tooltip title="View">
                <IconButton
                  size="small"
                  onClick={() => onView(role)}
                  color="info"
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {onEdit && (
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  onClick={() => onEdit(role)}
                  color="primary"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  onClick={() => onDelete(role)}
                  color="error"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        ),
      },
    ],
    [onView, onEdit, onDelete, page, rowsPerPage],
  );

  return (
    <DataTable
      columns={columns}
      rows={roles?.content ?? []}
      getRowId={(role) => role.id}
      isLoading={isLoading}
      pagination={{
        page,
        rowsPerPage,
        count: roles?.totalElements ?? 0,
        totalPages: roles?.totalPages ?? 0,
        onPageChange,
        onRowsPerPageChange,
      }}
      emptyState={{
        title: "No roles found",
        description: "Create a new role to get started.",
      }}
    />
  );
};
