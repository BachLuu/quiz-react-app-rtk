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
import type {
  QuizListProps,
  QuizSummary,
  QuizTableColumnId,
  QuizTableSortableColumnId,
} from "../types";

// Pure helper (kept outside component to avoid re-creation each render)
const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

/**
 * QuizList Component
 * Displays a list of quizzes in a table format with pagination
 */
export const QuizList = ({
  quizzes,
  isLoading = false,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  onView,
}: QuizListProps) => {
  const columns: Array<
    DataTableColumn<QuizSummary, QuizTableColumnId, QuizTableSortableColumnId>
  > = useMemo(
    () => [
      {
        id: "index",
        label: "#",
        align: "center",
        renderSkeleton: () => <Skeleton variant="text" width={24} />,
        render: (_quiz, rowIndex) => (rowIndex ?? 0) + 1,
      },
      {
        id: "title",
        label: "Title",
        sortable: true,
        getSortValue: (quiz) => quiz.title,
        renderSkeleton: () => <Skeleton variant="text" width="80%" />,
        render: (quiz) => (
          <Typography variant="body2" fontWeight="medium">
            {quiz.title}
          </Typography>
        ),
      },
      {
        id: "duration",
        label: "Duration",
        sortable: true,
        getSortValue: (quiz) => quiz.duration,
        renderSkeleton: () => <Skeleton variant="text" width="80%" />,
        render: (quiz) => formatDuration(quiz.duration),
      },
      {
        id: "status",
        label: "Status",
        sortable: true,
        getSortValue: (quiz) => quiz.isActive,
        renderSkeleton: () => (
          <Skeleton variant="rounded" width={70} height={24} />
        ),
        render: (quiz) => (
          <Chip
            label={quiz.isActive ? "Active" : "Inactive"}
            color={quiz.isActive ? "success" : "default"}
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
        render: (quiz) => (
          <Stack direction="row" spacing={0.5} justifyContent="center">
            {onView && (
              <Tooltip title="View">
                <IconButton
                  size="small"
                  color="info"
                  onClick={() => onView(quiz)}
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
                  onClick={() => onEdit(quiz)}
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
                  onClick={() => onDelete(quiz)}
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

  const rows = quizzes?.content ?? [];
  const totalCount = quizzes?.totalElements ?? 0;
  const totalPages = quizzes?.totalPages ?? 0;

  return (
    <DataTable<QuizSummary, QuizTableColumnId, QuizTableSortableColumnId>
      rows={rows}
      columns={columns}
      isLoading={isLoading}
      emptyState={{
        title: "No quizzes found",
        description: "Create your first quiz to get started",
      }}
      getRowId={(quiz) => quiz.id}
      initialOrderBy="title"
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
