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
import type { Quiz } from "@/shared/types/quiz";

/**
 * QuizManagementPage
 * Main page for managing quizzes (CRUD operations)
 */
export const QuizManagementPage = () => {
  // Quiz hook with CRUD operations
  const {
    quizzes,
    isLoadingQuizzes,
    isCreatingQuiz,
    isUpdatingQuiz,
    isDeletingQuiz,
    handleCreateQuiz,
    handleUpdateQuiz,
    handleDeleteQuiz,
  } = useQuiz();

  // Dialog states
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Open create dialog
  const handleOpenCreateDialog = () => {
    setSelectedQuiz(null);
    setIsEditMode(false);
    setIsFormDialogOpen(true);
  };

  // Open edit dialog
  const handleOpenEditDialog = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setIsEditMode(true);
    setIsFormDialogOpen(true);
  };

  // Close form dialog
  const handleCloseFormDialog = () => {
    setIsFormDialogOpen(false);
    setSelectedQuiz(null);
    setIsEditMode(false);
  };

  // Open delete dialog
  const handleOpenDeleteDialog = (quiz: Quiz) => {
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

    if (isEditMode && selectedQuiz) {
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
  const handleViewQuiz = (quiz: Quiz) => {
    // TODO: Navigate to quiz detail page
    console.log("View quiz:", quiz.id);
  };

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
            {isEditMode ? "Edit Quiz" : "Create New Quiz"}
            <IconButton
              onClick={handleCloseFormDialog}
              disabled={isCreatingQuiz || isUpdatingQuiz}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <QuizForm
              initialData={selectedQuiz ?? undefined}
              onSubmit={handleFormSubmit}
              isSubmitting={isCreatingQuiz || isUpdatingQuiz}
              submitButtonText={isEditMode ? "Update" : "Create"}
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
