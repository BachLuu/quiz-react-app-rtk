import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  Skeleton,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {
  createQuizSchema,
  updateQuizSchema,
  type CreateQuizFormData,
  type UpdateQuizFormData,
} from "../schemas/quiz.schema";
import type { QuizFormProps } from "../types";

/** Skeleton component for QuizForm loading state */
const QuizFormSkeleton = ({ isViewMode = false }: { isViewMode?: boolean }) => (
  <Stack spacing={3}>
    {/* View mode extra fields skeleton */}
    {isViewMode && (
      <>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          {[1, 2, 3].map((i) => (
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
    {/* Title Field skeleton */}
    <Box>
      <Skeleton variant="text" width={50} height={20} sx={{ mb: 0.5 }} />
      <Skeleton variant="rounded" width="100%" height={56} animation="wave" />
    </Box>
    {/* Description Field skeleton */}
    <Box>
      <Skeleton variant="text" width={100} height={20} sx={{ mb: 0.5 }} />
      <Skeleton variant="rounded" width="100%" height={120} animation="wave" />
    </Box>
    {/* Duration Field skeleton */}
    <Box>
      <Skeleton variant="text" width={120} height={20} sx={{ mb: 0.5 }} />
      <Skeleton variant="rounded" width="100%" height={56} animation="wave" />
    </Box>
    {/* Thumbnail URL Field skeleton */}
    <Box>
      <Skeleton variant="text" width={100} height={20} sx={{ mb: 0.5 }} />
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
 * QuizForm Component
 * Reusable form for creating and editing quizzes
 * Uses React Hook Form + Zod for validation
 */
export const QuizForm = ({
  mode,
  initialData,
  detailData,
  onSubmit,
  isSubmitting = false,
  isLoadingData = false,
  submitButtonText = "Save",
  onCancel,
}: QuizFormProps) => {
  const isViewMode = mode === "view";
  const isCreateMode = mode === "create";

  // Separate useForm hooks for create and edit/view modes (enterprise pattern)
  const createForm = useForm<CreateQuizFormData>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: 30,
      thumbnailUrl: "",
      isActive: true,
    },
  });

  const editForm = useForm<UpdateQuizFormData>({
    resolver: zodResolver(updateQuizSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      duration: initialData?.duration ?? 30,
      thumbnailUrl: initialData?.thumbnailUrl ?? "",
      isActive: initialData?.isActive ?? true,
    },
  });

  useEffect(() => {
    if (isCreateMode) return;

    if (isViewMode && detailData) {
      editForm.reset({
        title: detailData.title ?? "",
        description: detailData.description ?? "",
        duration: detailData.duration ?? 30,
        thumbnailUrl: detailData.thumbnailUrl ?? "",
        isActive: detailData.isActive ?? true,
      });
      return;
    }

    editForm.reset({
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      duration: initialData?.duration ?? 30,
      thumbnailUrl: initialData?.thumbnailUrl ?? "",
      isActive: initialData?.isActive ?? true,
    });
  }, [detailData, editForm, initialData, isCreateMode, isViewMode]);

  const onCreateSubmit: SubmitHandler<CreateQuizFormData> = async (data) => {
    if (!onSubmit) return;
    await onSubmit(data);
  };

  const onEditSubmit: SubmitHandler<UpdateQuizFormData> = async (data) => {
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
          {/* Title Field */}
          <TextField
            {...register("title")}
            label="Title"
            fullWidth
            required
            error={!!errors.title}
            helperText={errors.title?.message}
            disabled={isSubmitting}
            placeholder="Enter quiz title (5-255 characters)"
          />

          {/* Description Field */}
          <TextField
            {...register("description")}
            label="Description"
            fullWidth
            required
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description?.message}
            disabled={isSubmitting}
            placeholder="Enter quiz description (max 1000 characters)"
          />

          {/* Duration Field */}
          <TextField
            {...register("duration", { valueAsNumber: true })}
            label="Duration (minutes)"
            type="number"
            fullWidth
            required
            error={!!errors.duration}
            helperText={errors.duration?.message}
            disabled={isSubmitting}
            inputProps={{ min: 1, max: 3600 }}
            placeholder="Enter duration in minutes (1-3600)"
          />

          {/* Thumbnail URL Field */}
          <TextField
            {...register("thumbnailUrl")}
            label="Thumbnail URL"
            fullWidth
            error={!!errors.thumbnailUrl}
            helperText={errors.thumbnailUrl?.message}
            disabled={isSubmitting}
            placeholder="Enter thumbnail URL (optional, max 500 characters)"
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
    return <QuizFormSkeleton isViewMode={isViewMode} />;
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
                label="Quiz ID"
                value={detailData.id}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Total Questions"
                value={detailData.totalQuestions}
                fullWidth
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Total Attempts"
                value={detailData.totalAttempts}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Stack>
            <Divider />
          </>
        )}

        {/* Title Field */}
        <TextField
          {...register("title")}
          label="Title"
          fullWidth
          required
          error={!!errors.title}
          helperText={errors.title?.message}
          disabled={isSubmitting}
          placeholder="Enter quiz title (5-255 characters)"
          InputProps={{ readOnly: isViewMode }}
        />

        {/* Description Field */}
        <TextField
          {...register("description")}
          label="Description"
          fullWidth
          required
          multiline
          rows={4}
          error={!!errors.description}
          helperText={errors.description?.message}
          disabled={isSubmitting}
          placeholder="Enter quiz description (max 1000 characters)"
          InputProps={{ readOnly: isViewMode }}
        />

        {/* Duration Field */}
        <TextField
          {...register("duration", { valueAsNumber: true })}
          label="Duration (minutes)"
          type="number"
          fullWidth
          required
          error={!!errors.duration}
          helperText={errors.duration?.message}
          disabled={isSubmitting}
          inputProps={{ min: 1, max: 3600 }}
          placeholder="Enter duration in minutes (1-3600)"
          InputProps={{ readOnly: isViewMode }}
        />

        {/* Thumbnail URL Field */}
        <TextField
          {...register("thumbnailUrl")}
          label="Thumbnail URL"
          fullWidth
          error={!!errors.thumbnailUrl}
          helperText={errors.thumbnailUrl?.message}
          disabled={isSubmitting}
          placeholder="Enter thumbnail URL (optional, max 500 characters)"
          InputProps={{ readOnly: isViewMode }}
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
