import useUserManagement from "@/features/management/user/hooks/useUserManagement";
import {
  closeDeleteDialog,
  closeFormDialog,
  openDeleteDialog,
  openFormDialog,
  selectUserManagementUiDeleteDialogOpen,
  selectUserManagementUiDialogMode,
  selectUserManagementUiFormDialogOpen,
  selectUserManagementUiPage,
  selectUserManagementUiRowsPerPage,
  selectUserManagementUiSelectedUserId,
  setPage,
  setRowsPerPage,
} from "@/features/management/user/stores/slice";
import type {
  UserDetail,
  UserSummary,
} from "@/features/management/user/types/ui";
import { mapUserToFormValues } from "@/features/management/user/utils/mapper";
import { useAppDispatch, useAppSelector } from "@/shared/stores/hooks";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  DeleteUserDialog,
  UserForm,
  UserList,
} from "@/features/management/user/components";

/**
 * UserManagementPage
 * Main page for managing users (CRUD operations)
 */
export const UserManagementPage = () => {
  const dispatch = useAppDispatch();

  const page = useAppSelector(selectUserManagementUiPage);
  const rowsPerPage = useAppSelector(selectUserManagementUiRowsPerPage);
  const isFormDialogOpen = useAppSelector(selectUserManagementUiFormDialogOpen);
  const isDeleteDialogOpen = useAppSelector(
    selectUserManagementUiDeleteDialogOpen
  );
  const dialogMode = useAppSelector(selectUserManagementUiDialogMode);
  const selectedUserId = useAppSelector(selectUserManagementUiSelectedUserId);

  // User hook with CRUD operations
  const {
    // Data
    pagedUsers,
    // Loading states
    isLoadingPagedUsers,
    isCreatingUser,
    isUpdatingUser,
    isDeletingUser,
    isLoadingUserDetail,
    // Handlers
    handleCreateUser,
    handleViewUserDetail,
    handleUpdateUser,
    handleDeleteUser,
  } = useUserManagement({ page, size: rowsPerPage });

  const [selectedUserDetail, setSelectedUserDetail] =
    useState<UserDetail | null>(null);

  const selectedUser: UserSummary | undefined = pagedUsers?.content.find(
    (user) => user.id === selectedUserId
  );

  /* ---------------------------HANDLERS----------------------------------------------- */

  // Open create dialog
  const handleOpenCreateDialog = () => {
    setSelectedUserDetail(null);
    dispatch(openFormDialog({ mode: "create", userId: null }));
  };

  // Open edit dialog
  const handleOpenEditDialog = (user: UserSummary) => {
    setSelectedUserDetail(null);
    dispatch(openFormDialog({ mode: "edit", userId: user.id }));
  };

  // Close form dialog
  const handleCloseFormDialog = () => {
    setSelectedUserDetail(null);
    dispatch(closeFormDialog());
  };

  // Open delete dialog
  const handleOpenDeleteDialog = (user: UserSummary) => {
    dispatch(openDeleteDialog({ userId: user.id }));
  };

  // Close delete dialog
  const handleCloseDeleteDialog = () => {
    dispatch(closeDeleteDialog());
  };

  // Handle form submit (create or update)
  const handleFormSubmit = async (data: any) => {
    let success = false;

    if (dialogMode === "edit" && selectedUser) {
      success = await handleUpdateUser(selectedUser.id, data);
    } else {
      success = await handleCreateUser(data);
    }

    if (success) {
      handleCloseFormDialog();
    }
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;

    const success = await handleDeleteUser(selectedUser.id);
    if (success) {
      handleCloseDeleteDialog();
    }
  };

  // View user details
  const handleViewUser = async (user: UserSummary) => {
    setSelectedUserDetail(null);
    dispatch(openFormDialog({ mode: "view", userId: user.id }));

    const detail = await handleViewUserDetail(user.id);
    if (!detail) {
      handleCloseFormDialog();
      return;
    }

    setSelectedUserDetail(detail);
  };

  const dialogTitle =
    dialogMode === "edit"
      ? "Edit User"
      : dialogMode === "view"
      ? "User Detail"
      : "Create New User";

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
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateDialog}
        >
          Create User
        </Button>
      </Box>

      {/* User List */}
      <Paper sx={{ p: 2 }}>
        <UserList
          users={pagedUsers}
          isLoading={isLoadingPagedUsers}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(next) => dispatch(setPage(next))}
          onRowsPerPageChange={(next) => dispatch(setRowsPerPage(next))}
          onView={handleViewUser}
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
              disabled={isCreatingUser || isUpdatingUser || isLoadingUserDetail}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <UserForm
              mode={dialogMode}
              initialData={mapUserToFormValues(
                dialogMode === "edit"
                  ? selectedUser
                  : selectedUserDetail ?? undefined
              )}
              detailData={
                dialogMode === "view"
                  ? selectedUserDetail ?? undefined
                  : undefined
              }
              onSubmit={dialogMode === "view" ? undefined : handleFormSubmit}
              isSubmitting={
                isCreatingUser ||
                isUpdatingUser ||
                (dialogMode === "view" && isLoadingUserDetail)
              }
              submitButtonText={dialogMode === "edit" ? "Update" : "Create"}
              onCancel={handleCloseFormDialog}
            />
          </Box>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteUserDialog
        open={isDeleteDialogOpen}
        user={selectedUser ?? null}
        isDeleting={isDeletingUser}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

export default UserManagementPage;
