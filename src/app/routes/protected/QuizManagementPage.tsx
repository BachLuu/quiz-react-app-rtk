import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  QuizForm,
  QuizList,
  DeleteQuizDialog,
} from "../../../features/management/quiz/components";
import useQuiz from "../../../features/management/quiz/hooks/useQuiz";
import type { CreateQuizFormData } from "../../../features/management/quiz/schemas/quiz.schema";
import type { QuizDetailDto } from "../../../features/management/quiz/types";
import type { QuizViewDto } from "../../../features/management/quiz/types";

type QuizDialogMode = "create" | "edit" | "view";

/**
 * QuizManagementPage
 * Main page for managing quizzes (CRUD operations)
 */
export const QuizManagementPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Quiz hook with CRUD operations
  const {
    quizzes,
    isLoadingQuizzes,
    isCreatingQuiz,
    isUpdatingQuiz,
    isDeletingQuiz,
    isLoadingQuizDetail,
    handleCreateQuiz,
    handleViewQuizDetail,
    handleUpdateQuiz,
    handleDeleteQuiz,
  } = useQuiz({ page, size: rowsPerPage });

  // Dialog states
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizViewDto | null>(null);
  const [selectedQuizDetail, setSelectedQuizDetail] =
    useState<QuizDetailDto | null>(null);
  const [dialogMode, setDialogMode] = useState<QuizDialogMode>("create");

  // Open create dialog
  const handleOpenCreateDialog = () => {
    setSelectedQuiz(null);
    setSelectedQuizDetail(null);
    setDialogMode("create");
    setIsFormDialogOpen(true);
  };

  // Open edit dialog
  const handleOpenEditDialog = (quiz: QuizViewDto) => {
    setSelectedQuiz(quiz);
    setSelectedQuizDetail(null);
    setDialogMode("edit");
    setIsFormDialogOpen(true);
  };

  // Close form dialog
  const handleCloseFormDialog = () => {
    setIsFormDialogOpen(false);
    setSelectedQuiz(null);
    setSelectedQuizDetail(null);
  };

  // Open delete dialog
  const handleOpenDeleteDialog = (quiz: QuizViewDto) => {
    setSelectedQuiz(quiz);
    setIsDeleteDialogOpen(true);
  };

  // Close delete dialog
  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedQuiz(null);
  };

  // Handle form submit (create or update)
  const handleFormSubmit = async (data: CreateQuizFormData) => {
    let success = false;

    if (dialogMode === "edit" && selectedQuiz) {
      success = await handleUpdateQuiz(selectedQuiz.id, data);
    } else {
      success = await handleCreateQuiz(data);
    }

    if (success) {
      handleCloseFormDialog();
    }
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    if (!selectedQuiz) return;

    const success = await handleDeleteQuiz(selectedQuiz.id);
    if (success) {
      handleCloseDeleteDialog();
    }
  };

  // View quiz details (navigate to detail page)
  const handleViewQuiz = async (quiz: QuizViewDto) => {
    setSelectedQuiz(null);
    setSelectedQuizDetail(null);
    setDialogMode("view");
    setIsFormDialogOpen(true);

    const detail = await handleViewQuizDetail(quiz.id);
    if (!detail) {
      handleCloseFormDialog();
      return;
    }

    setSelectedQuizDetail(detail);
  };

  const dialogTitle =
    dialogMode === "edit"
      ? "Edit Quiz"
      : dialogMode === "view"
      ? "Quiz Detail"
      : "Create New Quiz";

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Quiz Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateDialog}
        >
          Create Quiz
        </Button>
      </Box>

      {/* Quiz List */}
      <Paper sx={{ p: 2 }}>
        <QuizList
          quizzes={quizzes}
          isLoading={isLoadingQuizzes}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={(next) => {
            setRowsPerPage(next);
            setPage(0);
          }}
          onView={handleViewQuiz}
          onEdit={handleOpenEditDialog}
          onDelete={handleOpenDeleteDialog}
        />
      </Paper>

      {/* Create/Edit Dialog */}
      <Dialog
        open={isFormDialogOpen}
        onClose={handleCloseFormDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {dialogTitle}
            <IconButton
              onClick={handleCloseFormDialog}
              disabled={isCreatingQuiz || isUpdatingQuiz || isLoadingQuizDetail}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <QuizForm
              mode={dialogMode}
              initialData={
                dialogMode === "edit"
                  ? selectedQuiz ?? undefined
                  : selectedQuizDetail ?? undefined
              }
              detailData={
                dialogMode === "view"
                  ? selectedQuizDetail ?? undefined
                  : undefined
              }
              onSubmit={dialogMode === "view" ? undefined : handleFormSubmit}
              isSubmitting={
                isCreatingQuiz ||
                isUpdatingQuiz ||
                (dialogMode === "view" && isLoadingQuizDetail)
              }
              submitButtonText={dialogMode === "edit" ? "Update" : "Create"}
              onCancel={handleCloseFormDialog}
            />
          </Box>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteQuizDialog
        open={isDeleteDialogOpen}
        quiz={selectedQuiz}
        isDeleting={isDeletingQuiz}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

export default QuizManagementPage;
