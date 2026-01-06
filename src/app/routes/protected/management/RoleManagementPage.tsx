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
  RoleForm,
  RoleList,
  DeleteRoleDialog,
} from "@/features/management/role/components";
import { useRoleManagement } from "@/features/management/role/hooks/useRoleManagement";
import type { CreateRoleFormData } from "@/features/management/role/schemas/role.schema";
import type { RoleDetail, RoleSummary } from "@/features/management/role/types";
import { mapRoleToFormValues } from "@/features/management/role/utils/mapper";
import {
  closeDeleteDialog,
  closeFormDialog,
  openDeleteDialog,
  openFormDialog,
  selectRoleManagementUiDeleteDialogOpen,
  selectRoleManagementUiDialogMode,
  selectRoleManagementUiFormDialogOpen,
  selectRoleManagementUiPage,
  selectRoleManagementUiRowsPerPage,
  selectRoleManagementUiSelectedRoleId,
  setPage,
  setRowsPerPage,
} from "@/features/management/role/stores/slice";
import { useAppDispatch, useAppSelector } from "@/shared/stores/hooks";

/**
 * RoleManagementPage
 * Main page for managing roles (CRUD operations)
 */
export const RoleManagementPage = () => {
  const dispatch = useAppDispatch();

  // Granular selectors for re-render optimization
  const page = useAppSelector(selectRoleManagementUiPage);
  const rowsPerPage = useAppSelector(selectRoleManagementUiRowsPerPage);
  const isFormDialogOpen = useAppSelector(selectRoleManagementUiFormDialogOpen);
  const isDeleteDialogOpen = useAppSelector(
    selectRoleManagementUiDeleteDialogOpen
  );
  const dialogMode = useAppSelector(selectRoleManagementUiDialogMode);
  const selectedRoleId = useAppSelector(selectRoleManagementUiSelectedRoleId);

  // Role hook with CRUD operations
  const {
    roles,
    isLoadingRoles,
    isCreatingRole,
    isUpdatingRole,
    isDeletingRole,
    isLoadingRoleDetail,
    handleCreateRole,
    handleViewRoleDetail,
    handleUpdateRole,
    handleDeleteRole,
  } = useRoleManagement({ page, size: rowsPerPage });

  // View mode stores full detail data fetched on-demand
  const [selectedRoleDetail, setSelectedRoleDetail] =
    useState<RoleDetail | null>(null);

  // Edit/Delete uses summary data from RTK Query cache
  const selectedRole: RoleSummary | undefined = roles?.content.find(
    (r) => r.id === selectedRoleId
  );

  /* --------------------------- HANDLERS ----------------------------------------------- */

  // Open create dialog
  const handleOpenCreateDialog = () => {
    setSelectedRoleDetail(null);
    dispatch(openFormDialog({ mode: "create", roleId: null }));
  };

  // Open edit dialog
  const handleOpenEditDialog = (role: RoleSummary) => {
    setSelectedRoleDetail(null);
    dispatch(openFormDialog({ mode: "edit", roleId: role.id }));
  };

  // Close form dialog
  const handleCloseFormDialog = () => {
    setSelectedRoleDetail(null);
    dispatch(closeFormDialog());
  };

  // Open delete dialog
  const handleOpenDeleteDialog = (role: RoleSummary) => {
    dispatch(openDeleteDialog({ roleId: role.id }));
  };

  // Close delete dialog
  const handleCloseDeleteDialog = () => {
    dispatch(closeDeleteDialog());
  };

  // Handle form submit (create or update)
  const handleFormSubmit = async (data: CreateRoleFormData) => {
    let success = false;

    if (dialogMode === "edit" && selectedRole) {
      success = await handleUpdateRole(selectedRole.id, data);
    } else {
      success = await handleCreateRole(data);
    }

    if (success) {
      handleCloseFormDialog();
    }
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    if (!selectedRole) return;

    const success = await handleDeleteRole(selectedRole.id);
    if (success) {
      handleCloseDeleteDialog();
    }
  };

  // View role details handler (fetches full detail on-demand)
  const handleViewRole = async (role: RoleSummary) => {
    setSelectedRoleDetail(null);
    dispatch(openFormDialog({ mode: "view", roleId: role.id }));

    const detail = await handleViewRoleDetail(role.id);
    if (!detail) {
      handleCloseFormDialog();
      return;
    }

    setSelectedRoleDetail(detail);
  };

  const dialogTitle =
    dialogMode === "edit"
      ? "Edit Role"
      : dialogMode === "view"
      ? "Role Detail"
      : "Create New Role";

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
          Role Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateDialog}
        >
          Create Role
        </Button>
      </Box>

      {/* Role List */}
      <Paper sx={{ p: 2 }}>
        <RoleList
          roles={roles}
          isLoading={isLoadingRoles}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(next) => dispatch(setPage(next))}
          onRowsPerPageChange={(next) => dispatch(setRowsPerPage(next))}
          onView={handleViewRole}
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
              disabled={isCreatingRole || isUpdatingRole || isLoadingRoleDetail}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <RoleForm
              mode={dialogMode}
              initialData={mapRoleToFormValues(
                dialogMode === "edit" ? selectedRole : selectedRoleDetail
              )}
              detailData={
                dialogMode === "view"
                  ? selectedRoleDetail ?? undefined
                  : undefined
              }
              onSubmit={dialogMode === "view" ? undefined : handleFormSubmit}
              isSubmitting={
                isCreatingRole ||
                isUpdatingRole ||
                (dialogMode === "view" && isLoadingRoleDetail)
              }
              submitButtonText={dialogMode === "edit" ? "Update" : "Create"}
              onCancel={handleCloseFormDialog}
            />
          </Box>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteRoleDialog
        open={isDeleteDialogOpen}
        role={selectedRole ?? null}
        isDeleting={isDeletingRole}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};
