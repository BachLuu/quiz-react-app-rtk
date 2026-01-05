import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import type { DeleteQuizDialogProps } from "../types/ui";

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
