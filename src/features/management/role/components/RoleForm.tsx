import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Skeleton,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {
  createRoleSchema,
  updateRoleSchema,
  type CreateRoleFormData,
  type UpdateRoleFormData,
} from "../schemas/role.schema";
import type { RoleFormProps } from "../types";

/** Skeleton component for RoleForm loading state */
const RoleFormSkeleton = () => (
  <Stack spacing={3}>
    {/* Name Field skeleton */}
    <Box>
      <Skeleton variant="text" width={80} height={20} sx={{ mb: 0.5 }} />
      <Skeleton variant="rounded" width="100%" height={56} animation="wave" />
    </Box>
    {/* Description Field skeleton */}
    <Box>
      <Skeleton variant="text" width={100} height={20} sx={{ mb: 0.5 }} />
      <Skeleton variant="rounded" width="100%" height={100} animation="wave" />
    </Box>
    {/* Switch skeleton */}
    <Stack direction="row" alignItems="center" spacing={1}>
      <Skeleton variant="rounded" width={42} height={26} animation="wave" />
      <Skeleton variant="text" width={60} animation="wave" />
    </Stack>
    {/* Action buttons skeleton */}
    <Stack direction="row" spacing={2} justifyContent="flex-end">
      <Skeleton variant="rounded" width={80} height={36} animation="wave" />
    </Stack>
  </Stack>
);

/**
 * RoleForm Component
 * Reusable form for creating and editing roles
 * Uses React Hook Form + Zod for validation
 */
export const RoleForm = ({
  mode,
  initialData,
  detailData,
  onSubmit,
  isSubmitting = false,
  isLoadingData = false,
  submitButtonText = "Save",
  onCancel,
}: RoleFormProps) => {
  const isViewMode = mode === "view";
  const isCreateMode = mode === "create";

  // ✅ Determine data source for edit/view form (view prioritizes detailData, edit uses initialData)
  const editSource = isViewMode ? detailData : initialData;

  // Separate useForm hooks for create and edit/view modes (enterprise pattern)
  const createForm = useForm<CreateRoleFormData>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // ✅ Use "values" prop to auto-sync form with async data (RHF v7.43+)
  const editForm = useForm<UpdateRoleFormData>({
    resolver: zodResolver(updateRoleSchema),
    values: {
      name: editSource?.name ?? "",
      description: editSource?.description ?? "",
      isActive: editSource?.isActive ?? true,
    },
  });

  const onCreateSubmit: SubmitHandler<CreateRoleFormData> = async (data) => {
    if (!onSubmit) return;
    await onSubmit(data);
  };

  const onEditSubmit: SubmitHandler<UpdateRoleFormData> = async (data) => {
    if (!onSubmit) return;
    await onSubmit(data);
  };

  // Render Create Mode Form
  if (isCreateMode) {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = createForm;

    return (
      <Box component="form" onSubmit={handleSubmit(onCreateSubmit)} noValidate>
        <Stack spacing={3}>
          {/* Name Field */}
          <TextField
            {...register("name")}
            label="Role Name"
            fullWidth
            required
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={isSubmitting}
            placeholder="Enter role name (3-50 characters)"
          />

          {/* Description Field */}
          <TextField
            {...register("description")}
            label="Description"
            fullWidth
            required
            multiline
            rows={3}
            error={!!errors.description}
            helperText={errors.description?.message}
            disabled={isSubmitting}
            placeholder="Enter description (3-50 characters)"
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
    return <RoleFormSkeleton />;
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
        {/* Name Field */}
        <TextField
          {...register("name")}
          label="Role Name"
          fullWidth
          required={!isViewMode}
          error={!!errors.name}
          helperText={errors.name?.message}
          disabled={isSubmitting || isViewMode}
          placeholder="Enter role name (3-50 characters)"
          InputProps={{ readOnly: isViewMode }}
          InputLabelProps={{ shrink: true }}
        />

        {/* Description Field */}
        <TextField
          {...register("description")}
          label="Description"
          fullWidth
          required={!isViewMode}
          multiline
          rows={3}
          error={!!errors.description}
          helperText={errors.description?.message}
          disabled={isSubmitting || isViewMode}
          placeholder="Enter description (3-50 characters)"
          InputProps={{ readOnly: isViewMode }}
          InputLabelProps={{ shrink: true }}
        />

        {/* Is Active Switch - Only in edit/view mode */}
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
