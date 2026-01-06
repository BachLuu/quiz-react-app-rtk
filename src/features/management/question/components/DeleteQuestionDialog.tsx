import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import type { DeleteQuestionDialogProps } from "../types";

/**
 * DeleteQuestionDialog Component
 * Confirmation dialog for deleting a question
 */
export const DeleteQuestionDialog = ({
  open,
  onClose,
  onConfirm,
  question,
  isDeleting = false,
}: DeleteQuestionDialogProps) => {
  const handleClose = () => {
    if (!isDeleting) {
      onClose();
    }
  };

  const handleConfirm = async () => {
    await onConfirm();
  };

  // Truncate content for display
  const truncatedContent =
    question?.content && question.content.length > 100
      ? `${question.content.substring(0, 100)}...`
      : question?.content;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-question-dialog-title"
      aria-describedby="delete-question-dialog-description"
    >
      <DialogTitle id="delete-question-dialog-title">
        Delete Question
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-question-dialog-description">
          Are you sure you want to delete this question?
          {truncatedContent && (
            <>
              <br />
              <br />
              <strong>Content:</strong> {truncatedContent}
            </>
          )}
          <br />
          <br />
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isDeleting} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={isDeleting}
          color="error"
          variant="contained"
          startIcon={isDeleting ? <CircularProgress size={20} /> : null}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
