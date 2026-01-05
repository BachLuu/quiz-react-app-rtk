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
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {
  createUserSchema,
  updateUserSchema,
  type CreateUserFormData,
  type UpdateUserFormData,
} from "../schemas/user.schema";
import type { UserFormProps } from "../types";

// Temporary hardcoded roles until role API is implemented
const AVAILABLE_ROLES = [
  { id: "1", name: "ROLE_ADMIN", label: "Admin" },
  { id: "2", name: "ROLE_USER", label: "User" },
  { id: "3", name: "ROLE_MODERATOR", label: "Moderator" },
];

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
  submitButtonText = "Save",
  onCancel,
}: UserFormProps) => {
  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";
  const isCreateMode = mode === "create";

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

  const editForm = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: initialData?.firstName ?? "",
      lastName: initialData?.lastName ?? "",
      password: "",
      avatar: initialData?.avatar ?? "",
      dateOfBirth: initialData?.dateOfBirth ?? "",
      roleIds:
        initialData?.roles?.map((role: any) =>
          typeof role === "string" ? role : role.name
        ) ?? [],
      isActive: initialData?.isActive ?? true,
    },
  });

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
                  disabled={isSubmitting}
                  input={<OutlinedInput label="Roles *" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as string[]).map((roleId) => {
                        const role = AVAILABLE_ROLES.find(
                          (r) => r.id === roleId
                        );
                        return (
                          <Chip
                            key={roleId}
                            label={role?.label ?? roleId}
                            size="small"
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {AVAILABLE_ROLES.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.label}
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

  return (
    <Box
      component="form"
      onSubmit={
        isViewMode ? (e) => e.preventDefault() : handleSubmit(onEditSubmit)
      }
      noValidate
    >
      <Stack spacing={3}>
        {isViewMode && (
          <>
            {isSubmitting && !detailData ? (
              <Stack direction="row" spacing={2} alignItems="center">
                <CircularProgress size={18} />
                <Typography variant="body2" color="text.secondary">
                  Loading user details...
                </Typography>
              </Stack>
            ) : (
              detailData && (
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
              )
            )}
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
            required
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            disabled={isSubmitting}
            placeholder="Enter first name"
            InputProps={{ readOnly: isViewMode, disabled: isViewMode }}
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
            InputProps={{ readOnly: isViewMode, disabled: isViewMode }}
          />
        </Stack>

        {/* Email Display - Read-only in Edit/View mode */}
        {initialData?.email && (
          <TextField
            label="Email"
            value={initialData.email}
            fullWidth
            InputProps={{ readOnly: true }}
            helperText={isEditMode ? "Email cannot be changed" : undefined}
          />
        )}

        {/* Password Field - Only in create mode */}
        {isCreateMode && (
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
        )}

        {/* Password Field - Optional in edit mode */}
        {isEditMode && (
          <TextField
            {...register("password")}
            label="Password"
            type="password"
            fullWidth
            error={!!errors.password}
            helperText={
              errors.password?.message || "Leave blank to keep current password"
            }
            disabled={isSubmitting}
            placeholder="Enter new password (optional)"
          />
        )}

        {/* Avatar URL Field */}
        <TextField
          {...register("avatar")}
          label="Avatar URL"
          fullWidth
          error={!!errors.avatar}
          helperText={errors.avatar?.message}
          disabled={isSubmitting}
          placeholder="Enter avatar URL (optional)"
          InputProps={{ readOnly: isViewMode, disabled: isViewMode }}
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
          InputProps={{ readOnly: isViewMode, disabled: isViewMode }}
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
                disabled={isSubmitting || isViewMode}
                input={<OutlinedInput label="Roles *" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(selected as string[]).map((roleId) => {
                      const role = AVAILABLE_ROLES.find((r) => r.id === roleId);
                      return (
                        <Chip
                          key={roleId}
                          label={role?.label ?? roleId}
                          size="small"
                        />
                      );
                    })}
                  </Box>
                )}
              >
                {AVAILABLE_ROLES.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.label}
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
