import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Stack,
  CircularProgress,
} from "@mui/material";
import {
  createQuizSchema,
  type CreateQuizFormData,
} from "../schemas/quiz.schema";
import type { Quiz } from "@/shared/types/quiz";

interface QuizFormProps {
  /** Initial data for editing an existing quiz */
  initialData?: Quiz;
  /** Callback when form is submitted */
  onSubmit: (data: CreateQuizFormData) => Promise<void>;
  /** Whether the form is currently submitting */
  isSubmitting?: boolean;
  /** Text for the submit button */
  submitButtonText?: string;
  /** Callback when cancel is clicked */
  onCancel?: () => void;
}

/**
 * QuizForm Component
 * Reusable form for creating and editing quizzes
 * Uses React Hook Form + Zod for validation
 */
export const QuizForm = ({
  initialData,
  onSubmit,
  isSubmitting = false,
  submitButtonText = "Save",
  onCancel,
}: QuizFormProps) => {
  const {
    register,
    handleSubmit,
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
    await onSubmit(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onFormSubmit)} noValidate>
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
          {...register("duration")}
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
        <FormControlLabel
          control={
            <Switch
              {...register("isActive")}
              defaultChecked={initialData?.isActive ?? true}
              disabled={isSubmitting}
            />
          }
          label="Active"
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
};
