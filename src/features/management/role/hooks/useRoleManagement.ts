import { useToast } from "@/app/providers/ToastProvider";
import { useGetPagedRolesQuery } from "@/shared/api";
import type { PageParamsRequest } from "@/shared/types";
import {
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useLazyGetRoleByIdQuery,
  useUpdateRoleMutation,
} from "../api";
import type { CreateRoleRequest, UpdateRoleRequest } from "../types";
import type { RoleDetail } from "../types/ui";
import { mapToRoleDetail } from "../utils/mapper";

export const useRoleManagement = ({ page, size }: PageParamsRequest) => {
  const { showError, showSuccess } = useToast();
  const [createRoleMutation, { isLoading: isCreatingRole }] =
    useCreateRoleMutation();
  const [updateRoleMutation, { isLoading: isUpdatingRole }] =
    useUpdateRoleMutation();
  const [deleteRoleMutation, { isLoading: isDeletingRole }] =
    useDeleteRoleMutation();
  const [getRoleByIdTrigger, { isLoading: isLoadingRoleDetail }] =
    useLazyGetRoleByIdQuery();
  const { data: pagedRoles, isLoading: isLoadingPagedRoles } =
    useGetPagedRolesQuery({ page, size });

  const handleCreateRole = async (
    createRoleDto: CreateRoleRequest
  ): Promise<boolean> => {
    try {
      await createRoleMutation(createRoleDto).unwrap();
      showSuccess("Role created successfully");
      return true;
    } catch (error) {
      showError("Failed to create role");
      return false;
    }
  };

  const handleViewRoleDetail = async (
    roleId: string
  ): Promise<RoleDetail | undefined> => {
    try {
      const dto = await getRoleByIdTrigger(roleId, true).unwrap();
      return mapToRoleDetail(dto); // map DTO -> UI model
    } catch (error) {
      showError("Failed to fetch role details");
      return undefined;
    }
  };

  const handleUpdateRole = async (
    roleId: string,
    updateRoleDto: UpdateRoleRequest
  ): Promise<boolean> => {
    try {
      await updateRoleMutation({
        id: roleId,
        data: updateRoleDto,
      }).unwrap();
      showSuccess("Role updated successfully");
      return true;
    } catch (error) {
      showError("Failed to update role");
      return false;
    }
  };

  const handleDeleteRole = async (roleId: string): Promise<boolean> => {
    try {
      await deleteRoleMutation(roleId).unwrap();
      showSuccess("Role deleted successfully");
      return true;
    } catch (error) {
      showError("Failed to delete role");
      return false;
    }
  };

  return {
    // Data
    roles: pagedRoles,
    // Loading states
    isLoadingRoles: isLoadingPagedRoles,
    isCreatingRole,
    isUpdatingRole,
    isDeletingRole,
    isLoadingRoleDetail,
    // Handlers
    handleCreateRole,
    handleViewRoleDetail,
    handleUpdateRole,
    handleDeleteRole,
  };
};

export default useRoleManagement;
