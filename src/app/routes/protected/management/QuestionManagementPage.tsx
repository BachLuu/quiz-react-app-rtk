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
  QuestionForm,
  QuestionList,
  DeleteQuestionDialog,
} from "@/features/management/question/components";
import { useQuestionManagement } from "@/features/management/question/hooks/useQuestionManagement";
import type { CreateQuestionFormData } from "@/features/management/question/schemas/question.schema";
import type {
  QuestionDetail,
  QuestionSummary,
} from "@/features/management/question/types";
import { mapQuestionToFormValues } from "@/features/management/question/utils/mapper";
import {
  closeDeleteDialog,
  closeFormDialog,
  openDeleteDialog,
  openFormDialog,
  selectQuestionManagementUiDeleteDialogOpen,
  selectQuestionManagementUiDialogMode,
  selectQuestionManagementUiFormDialogOpen,
  selectQuestionManagementUiPage,
  selectQuestionManagementUiRowsPerPage,
  selectQuestionManagementUiSelectedQuestionId,
  setPage,
  setRowsPerPage,
} from "@/features/management/question/stores/slice";
import { useAppDispatch, useAppSelector } from "@/shared/stores/hooks";

/**
 * QuestionManagementPage
 * Main page for managing questions (CRUD operations)
 */
export const QuestionManagementPage = () => {
  const dispatch = useAppDispatch();

  // Granular selectors for re-render optimization
  const page = useAppSelector(selectQuestionManagementUiPage);
  const rowsPerPage = useAppSelector(selectQuestionManagementUiRowsPerPage);
  const isFormDialogOpen = useAppSelector(
    selectQuestionManagementUiFormDialogOpen
  );
  const isDeleteDialogOpen = useAppSelector(
    selectQuestionManagementUiDeleteDialogOpen
  );
  const dialogMode = useAppSelector(selectQuestionManagementUiDialogMode);
  const selectedQuestionId = useAppSelector(
    selectQuestionManagementUiSelectedQuestionId
  );

  // Question hook with CRUD operations
  const {
    questions,
    isLoadingQuestions,
    isCreatingQuestion,
    isUpdatingQuestion,
    isDeletingQuestion,
    isLoadingQuestionDetail,
    handleCreateQuestion,
    handleViewQuestionDetail,
    handleUpdateQuestion,
    handleDeleteQuestion,
  } = useQuestionManagement({ page, size: rowsPerPage });

  // View mode stores full detail data fetched on-demand
  const [selectedQuestionDetail, setSelectedQuestionDetail] =
    useState<QuestionDetail | null>(null);

  // Edit/Delete uses summary data from RTK Query cache
  const selectedQuestion: QuestionSummary | undefined = questions?.content.find(
    (q) => q.id === selectedQuestionId
  );

  /* --------------------------- HANDLERS ----------------------------------------------- */

  // Open create dialog
  const handleOpenCreateDialog = () => {
    setSelectedQuestionDetail(null);
    dispatch(openFormDialog({ mode: "create", questionId: null }));
  };

  // Open edit dialog
  const handleOpenEditDialog = (question: QuestionSummary) => {
    setSelectedQuestionDetail(null);
    dispatch(openFormDialog({ mode: "edit", questionId: question.id }));
  };

  // Close form dialog
  const handleCloseFormDialog = () => {
    setSelectedQuestionDetail(null);
    dispatch(closeFormDialog());
  };

  // Open delete dialog
  const handleOpenDeleteDialog = (question: QuestionSummary) => {
    dispatch(openDeleteDialog({ questionId: question.id }));
  };

  // Close delete dialog
  const handleCloseDeleteDialog = () => {
    dispatch(closeDeleteDialog());
  };

  // Handle form submit (create or update)
  const handleFormSubmit = async (data: CreateQuestionFormData) => {
    let success = false;

    if (dialogMode === "edit" && selectedQuestion) {
      success = await handleUpdateQuestion(selectedQuestion.id, data);
    } else {
      success = await handleCreateQuestion(data);
    }

    if (success) {
      handleCloseFormDialog();
    }
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    if (!selectedQuestion) return;

    const success = await handleDeleteQuestion(selectedQuestion.id);
    if (success) {
      handleCloseDeleteDialog();
    }
  };

  // View question details handler (fetches full detail on-demand)
  const handleViewQuestion = async (question: QuestionSummary) => {
    setSelectedQuestionDetail(null);
    dispatch(openFormDialog({ mode: "view", questionId: question.id }));

    const detail = await handleViewQuestionDetail(question.id);
    if (!detail) {
      handleCloseFormDialog();
      return;
    }

    setSelectedQuestionDetail(detail);
  };

  const dialogTitle =
    dialogMode === "edit"
      ? "Edit Question"
      : dialogMode === "view"
      ? "Question Detail"
      : "Create New Question";

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
          Question Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateDialog}
        >
          Create Question
        </Button>
      </Box>

      {/* Question List */}
      <Paper sx={{ p: 2 }}>
        <QuestionList
          questions={questions}
          isLoading={isLoadingQuestions}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(next) => dispatch(setPage(next))}
          onRowsPerPageChange={(next) => dispatch(setRowsPerPage(next))}
          onView={handleViewQuestion}
          onEdit={handleOpenEditDialog}
          onDelete={handleOpenDeleteDialog}
        />
      </Paper>

      {/* Create/Edit/View Dialog */}
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
              disabled={
                isCreatingQuestion ||
                isUpdatingQuestion ||
                isLoadingQuestionDetail
              }
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <QuestionForm
              mode={dialogMode}
              initialData={mapQuestionToFormValues(
                dialogMode === "edit"
                  ? selectedQuestion
                  : selectedQuestionDetail
              )}
              detailData={
                dialogMode === "view"
                  ? selectedQuestionDetail ?? undefined
                  : undefined
              }
              onSubmit={dialogMode === "view" ? undefined : handleFormSubmit}
              isSubmitting={
                isCreatingQuestion ||
                isUpdatingQuestion ||
                (dialogMode === "view" && isLoadingQuestionDetail)
              }
              submitButtonText={dialogMode === "edit" ? "Update" : "Create"}
              onCancel={handleCloseFormDialog}
            />
          </Box>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteQuestionDialog
        open={isDeleteDialogOpen}
        question={selectedQuestion ?? null}
        isDeleting={isDeletingQuestion}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};
