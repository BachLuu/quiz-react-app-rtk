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
} from "../../../../features/management/quiz/components";
import useQuizManagement from "../../../../features/management/quiz/hooks/useQuizManagement";
import type { CreateQuizFormData } from "../../../../features/management/quiz/schemas/quiz.schema";
import type {
  QuizDetail,
  QuizSummary,
} from "../../../../features/management/quiz/types";
import { mapQuizToFormValues } from "@/features/management/quiz/utils/mapper";
import {
  closeDeleteDialog,
  closeFormDialog,
  openDeleteDialog,
  openFormDialog,
  selectQuizManagementUiDeleteDialogOpen,
  selectQuizManagementUiDialogMode,
  selectQuizManagementUiFormDialogOpen,
  selectQuizManagementUiPage,
  selectQuizManagementUiRowsPerPage,
  selectQuizManagementUiSelectedQuizId,
  setPage,
  setRowsPerPage,
} from "@/features/management/quiz/stores/slice";
import { useAppDispatch, useAppSelector } from "@/shared/stores/hooks";

/**
 * QuizManagementPage
 * Main page for managing quizzes (CRUD operations)
 */
export const QuizManagementPage = () => {
  const dispatch = useAppDispatch();

  const page = useAppSelector(selectQuizManagementUiPage);
  const rowsPerPage = useAppSelector(selectQuizManagementUiRowsPerPage);
  const isFormDialogOpen = useAppSelector(selectQuizManagementUiFormDialogOpen);
  const isDeleteDialogOpen = useAppSelector(
    selectQuizManagementUiDeleteDialogOpen,
  );
  const dialogMode = useAppSelector(selectQuizManagementUiDialogMode);
  const selectedQuizId = useAppSelector(selectQuizManagementUiSelectedQuizId);

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
  } = useQuizManagement({ page, size: rowsPerPage });

  const [selectedQuizDetail, setSelectedQuizDetail] =
    useState<QuizDetail | null>(null);

  const selectedQuiz: QuizSummary | undefined = quizzes?.content.find(
    (quiz) => quiz.id === selectedQuizId,
  );

  /* ---------------------------HANDLERS  ----------------------------------------------- */

  // Open create dialog
  const handleOpenCreateDialog = () => {
    setSelectedQuizDetail(null);
    dispatch(openFormDialog({ mode: "create", quizId: null }));
  };

  // Open edit dialog
  const handleOpenEditDialog = (quiz: QuizSummary) => {
    setSelectedQuizDetail(null);
    dispatch(openFormDialog({ mode: "edit", quizId: quiz.id }));
  };

  // Close form dialog
  const handleCloseFormDialog = () => {
    setSelectedQuizDetail(null);
    dispatch(closeFormDialog());
  };

  // Open delete dialog
  const handleOpenDeleteDialog = (quiz: QuizSummary) => {
    dispatch(openDeleteDialog({ quizId: quiz.id }));
  };

  // Close delete dialog
  const handleCloseDeleteDialog = () => {
    dispatch(closeDeleteDialog());
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

  // View quiz details handler
  const handleViewQuiz = async (quiz: QuizSummary) => {
    setSelectedQuizDetail(null);
    dispatch(openFormDialog({ mode: "view", quizId: quiz.id }));

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
          onPageChange={(next) => dispatch(setPage(next))}
          onRowsPerPageChange={(next) => dispatch(setRowsPerPage(next))}
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
              initialData={mapQuizToFormValues(
                dialogMode === "edit" ? selectedQuiz : selectedQuizDetail,
              )}
              detailData={
                dialogMode === "view"
                  ? (selectedQuizDetail ?? undefined)
                  : undefined
              }
              onSubmit={dialogMode === "view" ? undefined : handleFormSubmit}
              isSubmitting={isCreatingQuiz || isUpdatingQuiz}
              isLoadingData={
                dialogMode !== "create" &&
                isLoadingQuizDetail &&
                !selectedQuizDetail
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
        quiz={selectedQuiz ?? null}
        isDeleting={isDeletingQuiz}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

export default QuizManagementPage;
