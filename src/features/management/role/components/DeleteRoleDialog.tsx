import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import type { DeleteRoleDialogProps } from "../types";

/**
 * DeleteRoleDialog Component
 * Confirmation dialog for deleting a role
 */
export const DeleteRoleDialog = ({
  open,
  onClose,
  onConfirm,
  role,
  isDeleting = false,
}: DeleteRoleDialogProps) => {
  const handleClose = () => {
    if (!isDeleting) {
      onClose();
    }
  };

  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-role-dialog-title"
      aria-describedby="delete-role-dialog-description"
    >
      <DialogTitle id="delete-role-dialog-title">Delete Role</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-role-dialog-description">
          Are you sure you want to delete this role?
          {role?.name && (
            <>
              <br />
              <br />
              <strong>Role:</strong> {role.name}
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
