import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {
  createQuizSchema,
  type CreateQuizFormData,
} from "../schemas/quiz.schema";
import type { QuizFormProps } from "../types";

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
  submitButtonText = "Save",
  onCancel,
}: QuizFormProps) => {
  const isViewMode = mode === "view";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateQuizFormData>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      duration: initialData?.duration ?? 30,
      thumbnailUrl: initialData?.thumbnailUrl ?? "",
      isActive: initialData?.isActive ?? true,
    },
  });

  const onFormSubmit: SubmitHandler<CreateQuizFormData> = async (data) => {
    if (!onSubmit) return;
    await onSubmit(data);
  };

  return (
    <Box
      component="form"
      onSubmit={
        isViewMode ? (e) => e.preventDefault() : handleSubmit(onFormSubmit)
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
                  Loading quiz details...
                </Typography>
              </Stack>
            ) : (
              detailData && (
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
              )
            )}
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
          InputProps={{ readOnly: isViewMode, disabled: isViewMode }}
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
          InputProps={{ readOnly: isViewMode, disabled: isViewMode }}
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
          InputProps={{ readOnly: isViewMode, disabled: isViewMode }}
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
          InputProps={{ readOnly: isViewMode, disabled: isViewMode }}
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
