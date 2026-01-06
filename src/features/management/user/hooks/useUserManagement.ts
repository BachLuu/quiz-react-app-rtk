import { useToast } from "@/app/providers/ToastProvider";
import { useGetPagedUsersQuery } from "@/shared/api";
import type { PageParamsRequest } from "@/shared/types";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
} from "../api";
import type {
  CreateUserRequest,
  UpdateUserRequest,
  UserDetail,
} from "../types";
import { mapToUserDetail } from "../utils/mapper";

const useUserManagement = ({ page, size }: PageParamsRequest) => {
  const { showError, showSuccess } = useToast();
  const [createUserMutation, { isLoading: isCreatingUser }] =
    useCreateUserMutation();
  const [updateUserMutation, { isLoading: isUpdatingUser }] =
    useUpdateUserMutation();
  const [deleteUserMutation, { isLoading: isDeletingUser }] =
    useDeleteUserMutation();
  const [getUserByIdTrigger, { isLoading: isLoadingUserDetail }] =
    useLazyGetUserByIdQuery();
  const { data: pagedUsers, isLoading: isLoadingPagedUsers } =
    useGetPagedUsersQuery({ page, size });
  const handleCreateUser = async (
    createUserDto: CreateUserRequest
  ): Promise<boolean> => {
    try {
      await createUserMutation(createUserDto).unwrap();
      showSuccess("User created successfully");
      return true;
    } catch (error) {
      showError("Failed to create user");
      return false;
    }
  };

  const handleViewUserDetail = async (
    userId: string
  ): Promise<UserDetail | undefined> => {
    try {
      const dto = await getUserByIdTrigger(userId, true).unwrap();
      return mapToUserDetail(dto); // map DTO -> UI model
    } catch (error) {
      showError("Failed to fetch user details");
      return undefined;
    }
  };

  const handleUpdateUser = async (
    userId: string,
    updateUserDto: UpdateUserRequest
  ): Promise<boolean> => {
    try {
      await updateUserMutation({ id: userId, data: updateUserDto }).unwrap();
      showSuccess("User updated successfully");
      return true;
    } catch (error) {
      showError("Failed to update user");
      return false;
    }
  };

  const handleDeleteUser = async (userId: string): Promise<boolean> => {
    try {
      await deleteUserMutation(userId).unwrap();
      showSuccess("User deleted successfully");
      return true;
    } catch (error) {
      showError("Failed to delete user");
      return false;
    }
  };

  return {
    //Data
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
  };
};

export default useUserManagement;
