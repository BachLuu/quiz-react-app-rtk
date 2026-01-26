import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Skeleton,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useGetActiveRolesQuery } from "@/shared/api";
import type { Role } from "@/shared/types";
import {
  createUserSchema,
  updateUserSchema,
  type CreateUserFormData,
  type UpdateUserFormData,
} from "../schemas/user.schema";
import type { UserFormProps } from "../types";

/** Skeleton component for UserForm loading state */
const UserFormSkeleton = ({ isViewMode = false }: { isViewMode?: boolean }) => (
  <Stack spacing={3}>
    {/* View mode extra fields skeleton */}
    {isViewMode && (
      <>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          {[1, 2].map((i) => (
            <Box key={i} flex={1}>
              <Skeleton
                variant="text"
                width={80}
                height={20}
                sx={{ mb: 0.5 }}
              />
              <Skeleton
                variant="rounded"
                width="100%"
                height={56}
                animation="wave"
              />
            </Box>
          ))}
        </Stack>
        <Divider />
      </>
    )}
    {/* Name Fields Row skeleton */}
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      {[1, 2].map((i) => (
        <Box key={i} flex={1}>
          <Skeleton variant="text" width={80} height={20} sx={{ mb: 0.5 }} />
          <Skeleton
            variant="rounded"
            width="100%"
            height={56}
            animation="wave"
          />
        </Box>
      ))}
    </Stack>
    {/* Email Field skeleton */}
    <Box>
      <Skeleton variant="text" width={50} height={20} sx={{ mb: 0.5 }} />
      <Skeleton variant="rounded" width="100%" height={56} animation="wave" />
    </Box>
    {/* Avatar URL Field skeleton */}
    <Box>
      <Skeleton variant="text" width={80} height={20} sx={{ mb: 0.5 }} />
      <Skeleton variant="rounded" width="100%" height={56} animation="wave" />
    </Box>
    {/* Date of Birth Field skeleton */}
    <Box>
      <Skeleton variant="text" width={100} height={20} sx={{ mb: 0.5 }} />
      <Skeleton variant="rounded" width="100%" height={56} animation="wave" />
    </Box>
    {/* Roles Select skeleton */}
    <Box>
      <Skeleton variant="text" width={50} height={20} sx={{ mb: 0.5 }} />
      <Skeleton variant="rounded" width="100%" height={56} animation="wave" />
    </Box>
    {/* Switch skeleton */}
    <Stack direction="row" alignItems="center" spacing={1}>
      <Skeleton variant="rounded" width={42} height={26} animation="wave" />
      <Skeleton variant="text" width={60} animation="wave" />
    </Stack>
    {/* Action buttons skeleton */}
    <Stack direction="row" spacing={2} justifyContent="flex-end">
      <Skeleton variant="rounded" width={80} height={36} animation="wave" />
      {!isViewMode && (
        <Skeleton variant="rounded" width={100} height={36} animation="wave" />
      )}
    </Stack>
  </Stack>
);

/**
 * UserForm Component
 * Reusable form for creating and editing users
 * Uses React Hook Form + Zod for validation
 */
export const UserForm = ({
  mode,
  initialData,
  detailData,
  onSubmit,
  isSubmitting = false,
  isLoadingData = false,
  submitButtonText = "Save",
  onCancel,
}: UserFormProps) => {
  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";
  const isCreateMode = mode === "create";

  const { data: activeRoles, isLoading: isLoadingRoles } =
    useGetActiveRolesQuery();

  // ✅ Determine data source for edit/view form (view prioritizes detailData, edit uses initialData)
  const editSource = isViewMode ? detailData : initialData;

  // Separate useForm hooks for create and edit/view modes (enterprise pattern)
  const createForm = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      avatar: "",
      dateOfBirth: "",
      roleIds: [],
      isActive: true,
    },
  });

  // ✅ Use "values" prop to auto-sync form with async data (RHF v7.43+)
  const editForm = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    values: {
      firstName: editSource?.firstName ?? "",
      lastName: editSource?.lastName ?? "",
      avatar: editSource?.avatar ?? "",
      dateOfBirth: editSource?.dateOfBirth ?? "",
      roleIds:
        editSource?.roles?.map((role: string | Role) =>
          typeof role === "string" ? role : role.id,
        ) ?? [],
      isActive: editSource?.isActive ?? true,
    },
  });

  const getRoleLabelByIdOrName = (roleIdOrName: string): string => {
    const role = activeRoles?.find(
      (r) => r.id === roleIdOrName || r.name === roleIdOrName,
    );
    return role?.name ?? roleIdOrName;
  };

  const onCreateSubmit: SubmitHandler<CreateUserFormData> = async (data) => {
    if (!onSubmit) return;
    await onSubmit(data);
  };

  const onEditSubmit: SubmitHandler<UpdateUserFormData> = async (data) => {
    if (!onSubmit) return;
    await onSubmit(data);
  };

  // Render Create Mode Form
  if (isCreateMode) {
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = createForm;

    return (
      <Box component="form" onSubmit={handleSubmit(onCreateSubmit)} noValidate>
        <Stack spacing={3}>
          {/* Name Fields Row */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              {...register("firstName")}
              label="First Name"
              fullWidth
              required
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              disabled={isSubmitting}
              placeholder="Enter first name"
            />
            <TextField
              {...register("lastName")}
              label="Last Name"
              fullWidth
              required
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              disabled={isSubmitting}
              placeholder="Enter last name"
            />
          </Stack>

          {/* Email Field */}
          <TextField
            {...register("email")}
            label="Email"
            type="email"
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={isSubmitting}
            placeholder="Enter email address"
          />

          {/* Password Field */}
          <TextField
            {...register("password")}
            label="Password"
            type="password"
            fullWidth
            required
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={isSubmitting}
            placeholder="Enter password (min 6 characters)"
          />

          {/* Avatar URL Field */}
          <TextField
            {...register("avatar")}
            label="Avatar URL"
            fullWidth
            error={!!errors.avatar}
            helperText={errors.avatar?.message}
            disabled={isSubmitting}
            placeholder="Enter avatar URL (optional)"
          />

          {/* Date of Birth Field */}
          <TextField
            {...register("dateOfBirth")}
            label="Date of Birth"
            type="date"
            fullWidth
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth?.message}
            disabled={isSubmitting}
            placeholder="YYYY-MM-DD"
            InputLabelProps={{ shrink: true }}
          />

          {/* Roles Multi-Select */}
          <Controller
            name="roleIds"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.roleIds}>
                <InputLabel id="user-roles-label">Roles *</InputLabel>
                <Select
                  {...field}
                  labelId="user-roles-label"
                  multiple
                  disabled={isSubmitting || isLoadingRoles}
                  input={<OutlinedInput label="Roles *" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as string[]).map((roleId) => {
                        return (
                          <Chip
                            key={roleId}
                            label={getRoleLabelByIdOrName(roleId)}
                            size="small"
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {(activeRoles ?? []).map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.roleIds && (
                  <FormHelperText>{errors.roleIds.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          {/* Is Active Switch */}
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={!!field.value}
                    onChange={(_, checked) => field.onChange(checked)}
                    disabled={isSubmitting}
                  />
                }
                label="Active"
              />
            )}
          />

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            {onCancel && (
              <Button
                variant="outlined"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {isSubmitting ? "Saving..." : submitButtonText}
            </Button>
          </Stack>
        </Stack>
      </Box>
    );
  }

  // Render Edit/View Mode Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = editForm;

  // Show skeleton while loading data for edit/view mode
  if (isLoadingData) {
    return <UserFormSkeleton isViewMode={isViewMode} />;
  }

  return (
    <Box
      component="form"
      onSubmit={
        isViewMode ? (e) => e.preventDefault() : handleSubmit(onEditSubmit)
      }
      noValidate
    >
      <Stack spacing={3}>
        {isViewMode && detailData && (
          <>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="User ID"
                value={detailData.id}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Created At"
                value={new Date(detailData.createdAt).toLocaleDateString()}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Stack>
            <Divider />
          </>
        )}

        {/* Name Fields Row */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          {/* First Name Field */}
          <TextField
            {...register("firstName")}
            label="First Name"
            fullWidth
            required={!isViewMode}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            disabled={isSubmitting || isViewMode}
            placeholder="Enter first name"
            InputProps={{ readOnly: isViewMode }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            {...register("lastName")}
            label="Last Name"
            fullWidth
            required={!isViewMode}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            disabled={isSubmitting || isViewMode}
            placeholder="Enter last name"
            InputProps={{ readOnly: isViewMode }}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>

        {/* Email Display - Read-only in Edit/View mode */}
        {editSource?.email && (
          <TextField
            label="Email"
            value={editSource.email}
            fullWidth
            InputProps={{ readOnly: true }}
            helperText={isEditMode ? "Email cannot be changed" : undefined}
          />
        )}

        {/* Avatar URL Field */}
        <TextField
          {...register("avatar")}
          label="Avatar URL"
          fullWidth
          error={!!errors.avatar}
          helperText={errors.avatar?.message}
          disabled={isSubmitting || isViewMode}
          placeholder="Enter avatar URL (optional)"
          InputProps={{ readOnly: isViewMode }}
          InputLabelProps={{ shrink: true }}
        />

        {/* Date of Birth Field */}
        <TextField
          {...register("dateOfBirth")}
          label="Date of Birth"
          type="date"
          fullWidth
          error={!!errors.dateOfBirth}
          helperText={errors.dateOfBirth?.message}
          disabled={isSubmitting || isViewMode}
          placeholder="YYYY-MM-DD"
          InputLabelProps={{ shrink: true }}
          InputProps={{ readOnly: isViewMode }}
        />

        {/* Roles Multi-Select */}
        <Controller
          name="roleIds"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.roleIds}>
              <InputLabel id="user-roles-label">Roles *</InputLabel>
              <Select
                {...field}
                labelId="user-roles-label"
                multiple
                disabled={isSubmitting || isViewMode || isLoadingRoles}
                input={<OutlinedInput label="Roles *" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(selected as string[]).map((roleId) => {
                      return (
                        <Chip
                          key={roleId}
                          label={getRoleLabelByIdOrName(roleId)}
                          size="small"
                        />
                      );
                    })}
                  </Box>
                )}
              >
                {(activeRoles ?? []).map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.roleIds && (
                <FormHelperText>{errors.roleIds.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        {/* Is Active Switch */}
        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={!!field.value}
                  onChange={(_, checked) => field.onChange(checked)}
                  disabled={isSubmitting || isViewMode}
                />
              }
              label="Active"
            />
          )}
        />

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {onCancel && (
            <Button
              variant="outlined"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {isViewMode ? "Close" : "Cancel"}
            </Button>
          )}
          {!isViewMode && (
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {isSubmitting ? "Saving..." : submitButtonText}
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
