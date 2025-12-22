import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

import type { QuizSummary } from "../types";

interface DeleteQuizDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** The quiz to delete */
  quiz: QuizSummary | null;
  /** Whether delete is in progress */
  isDeleting?: boolean;
  /** Callback when dialog is closed */
  onClose: () => void;
  /** Callback when delete is confirmed */
  onConfirm: () => void;
}

/**
 * DeleteQuizDialog Component
 * Confirmation dialog for deleting a quiz
 */
export const DeleteQuizDialog = ({
  open,
  quiz,
  isDeleting = false,
  onClose,
  onConfirm,
}: DeleteQuizDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={isDeleting ? undefined : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Delete Quiz</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the quiz{" "}
          <strong>"{quiz?.title}"</strong>? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={isDeleting}
          startIcon={isDeleting ? <CircularProgress size={20} /> : null}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
