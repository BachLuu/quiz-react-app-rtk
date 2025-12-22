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
import type { QuizViewDto } from "../types";
import type { Page } from "@/shared/types/page";

// Pure helper (kept outside component to avoid re-creation each render)
const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

interface QuizListProps {
  /** List of quizzes to display */
  quizzes?: Page<QuizViewDto>;
  /** Whether data is loading */
  isLoading?: boolean;
  /** Zero-based page index */
  page: number;
  /** Page size */
  rowsPerPage: number;
  /** Called when page changes */
  onPageChange: (page: number) => void;
  /** Called when rows-per-page changes */
  onRowsPerPageChange: (rowsPerPage: number) => void;
  /** Callback when edit button is clicked */
  onEdit?: (quiz: QuizViewDto) => void;
  /** Callback when delete button is clicked */
  onDelete?: (quiz: QuizViewDto) => void;
  /** Callback when view button is clicked */
  onView?: (quiz: QuizViewDto) => void;
}

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
  type ColumnId = "title" | "description" | "duration" | "status" | "actions";
  type SortableColumnId = Exclude<ColumnId, "actions">;

  type Column = DataTableColumn<QuizViewDto, ColumnId, SortableColumnId>;

  const columns: Column[] = useMemo(
    () => [
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
        id: "description",
        label: "Description",
        sortable: true,
        getSortValue: (quiz) => quiz.description,
        renderSkeleton: () => <Skeleton variant="text" width="80%" />,
        render: (quiz) => (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              maxWidth: 250,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {quiz.description}
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
    <DataTable<QuizViewDto, ColumnId, SortableColumnId>
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
