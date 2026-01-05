import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

import type { UserSummary } from "../types/ui";

interface DeleteUserDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** The user to delete */
  user: UserSummary | null;
  /** Whether delete is in progress */
  isDeleting?: boolean;
  /** Callback when dialog is closed */
  onClose: () => void;
  /** Callback when delete is confirmed */
  onConfirm: () => void;
}

/**
 * DeleteUserDialog Component
 * Confirmation dialog for deleting a user
 */
export const DeleteUserDialog = ({
  open,
  user,
  isDeleting = false,
  onClose,
  onConfirm,
}: DeleteUserDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={isDeleting ? undefined : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete user{" "}
          <strong>
            "{user?.firstName} {user?.lastName}"
          </strong>{" "}
          ({user?.email})? This action cannot be undone.
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
