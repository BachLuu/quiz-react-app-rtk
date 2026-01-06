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
  QuestionSummary,
  QuestionTableColumnId,
  QuestionTableSortableColumnId,
} from "../types/ui";

export interface QuestionListProps {
  questions?: Page<QuestionSummary>;
  isLoading?: boolean;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onEdit?: (question: QuestionSummary) => void;
  onDelete?: (question: QuestionSummary) => void;
  onView?: (question: QuestionSummary) => void;
}

/**
 * Get color for question type chip
 */
const getQuestionTypeColor = (
  type: string
): "success" | "warning" | "error" | "default" => {
  switch (type) {
    case "BEGINNER":
      return "success";
    case "INTERMEDIATE":
      return "warning";
    case "ADVANCED":
      return "error";
    default:
      return "default";
  }
};

/**
 * QuestionList Component
 * Displays a list of questions in a table format with pagination
 */
export const QuestionList = ({
  questions,
  isLoading = false,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  onView,
}: QuestionListProps) => {
  const columns: Array<
    DataTableColumn<
      QuestionSummary,
      QuestionTableColumnId,
      QuestionTableSortableColumnId
    >
  > = useMemo(
    () => [
      {
        id: "index",
        label: "#",
        align: "center",
        renderSkeleton: () => <Skeleton variant="text" width={24} />,
        render: (_question, rowIndex) => (rowIndex ?? 0) + 1,
      },
      {
        id: "content",
        label: "Content",
        sortable: true,
        getSortValue: (question) => question.content,
        renderSkeleton: () => <Skeleton variant="text" width="80%" />,
        render: (question) => (
          <Typography
            variant="body2"
            sx={{
              maxWidth: 400,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {question.content}
          </Typography>
        ),
      },
      {
        id: "questionType",
        label: "Type",
        sortable: true,
        getSortValue: (question) => question.questionType,
        renderSkeleton: () => (
          <Skeleton variant="rounded" width={80} height={24} />
        ),
        render: (question) => (
          <Chip
            label={question.questionType}
            color={getQuestionTypeColor(question.questionType)}
            size="small"
          />
        ),
      },
      {
        id: "status",
        label: "Status",
        sortable: false,
        renderSkeleton: () => (
          <Skeleton variant="rounded" width={70} height={24} />
        ),
        render: (question: QuestionSummary) => (
          <Chip
            label={question.isActive ? "Active" : "Inactive"}
            color={question.isActive ? "success" : "default"}
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
        render: (question) => (
          <Stack direction="row" spacing={0.5} justifyContent="center">
            {onView && (
              <Tooltip title="View">
                <IconButton
                  size="small"
                  color="info"
                  onClick={() => onView(question)}
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
                  onClick={() => onEdit(question)}
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
                  onClick={() => onDelete(question)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        ),
      },
    ],
    [onView, onEdit, onDelete]
  );

  return (
    <DataTable
      columns={columns}
      rows={questions?.content ?? []}
      getRowId={(question) => question.id}
      isLoading={isLoading}
      pagination={{
        page,
        rowsPerPage,
        count: questions?.totalElements ?? 0,
        totalPages: questions?.totalPages ?? 0,
        onPageChange,
        onRowsPerPageChange,
      }}
      emptyState={{
        title: "No questions found",
        description: "Create a new question to get started.",
      }}
    />
  );
};
