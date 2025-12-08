import { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Typography,
  Skeleton,
  TablePagination,
  Tooltip,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { Quiz } from "@/shared/types/quiz";

interface QuizListProps {
  /** List of quizzes to display */
  quizzes: Quiz[];
  /** Whether data is loading */
  isLoading?: boolean;
  /** Callback when edit button is clicked */
  onEdit?: (quiz: Quiz) => void;
  /** Callback when delete button is clicked */
  onDelete?: (quiz: Quiz) => void;
  /** Callback when view button is clicked */
  onView?: (quiz: Quiz) => void;
}

/**
 * QuizList Component
 * Displays a list of quizzes in a table format with pagination
 */
export const QuizList = ({
  quizzes,
  isLoading = false,
  onEdit,
  onDelete,
  onView,
}: QuizListProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Format duration for display
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${hours}h`;
  };

  // Format date for display
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton variant="text" width="80%" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={60} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rounded" width={70} height={24} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={100} />
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Skeleton variant="circular" width={32} height={32} />
                    <Skeleton variant="circular" width={32} height={32} />
                    <Skeleton variant="circular" width={32} height={32} />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  // Empty state
  if (quizzes.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No quizzes found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create your first quiz to get started
        </Typography>
      </Box>
    );
  }

  // Paginated data
  const paginatedQuizzes = quizzes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedQuizzes.map((quiz) => (
              <TableRow
                key={quiz.id}
                hover
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {quiz.title}
                  </Typography>
                </TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>{formatDuration(quiz.duration)}</TableCell>
                <TableCell>
                  <Chip
                    label={quiz.isActive ? "Active" : "Inactive"}
                    color={quiz.isActive ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{formatDate(quiz.createdAt)}</TableCell>
                <TableCell align="right">
                  <Stack
                    direction="row"
                    spacing={0.5}
                    justifyContent="flex-end"
                  >
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={quizzes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
