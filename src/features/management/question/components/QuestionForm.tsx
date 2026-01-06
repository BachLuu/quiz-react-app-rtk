import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { QUESTION_TYPES } from "@/shared/types";
import {
  createQuestionSchema,
  updateQuestionSchema,
  type CreateQuestionFormData,
  type UpdateQuestionFormData,
} from "../schemas/question.schema";
import type { QuestionFormProps } from "../types";

/**
 * QuestionForm Component
 * Reusable form for creating and editing questions
 * Uses React Hook Form + Zod for validation
 */
export const QuestionForm = ({
  mode,
  initialData,
  detailData,
  onSubmit,
  isSubmitting = false,
  submitButtonText = "Save",
  onCancel,
}: QuestionFormProps) => {
  const isViewMode = mode === "view";
  const isCreateMode = mode === "create";

  // ✅ Determine data source for edit/view form (view prioritizes detailData, edit uses initialData)
  const editSource = isViewMode ? detailData : initialData;

  // Separate useForm hooks for create and edit/view modes (enterprise pattern)
  const createForm = useForm<CreateQuestionFormData>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      content: "",
      questionType: "MULTIPLE_CHOICE",
    },
  });

  // ✅ Use "values" prop to auto-sync form with async data (RHF v7.43+)
  const editForm = useForm<UpdateQuestionFormData>({
    resolver: zodResolver(updateQuestionSchema),
    values: {
      content: editSource?.content ?? "",
      questionType: editSource?.questionType ?? "MULTIPLE_CHOICE",
      isActive: editSource?.isActive ?? true,
    },
  });

  const onCreateSubmit: SubmitHandler<CreateQuestionFormData> = async (
    data
  ) => {
    if (!onSubmit) return;
    await onSubmit(data);
  };

  const onEditSubmit: SubmitHandler<UpdateQuestionFormData> = async (data) => {
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
          {/* Content Field */}
          <TextField
            {...register("content")}
            label="Content"
            fullWidth
            required
            multiline
            rows={4}
            error={!!errors.content}
            helperText={errors.content?.message}
            disabled={isSubmitting}
            placeholder="Enter question content (min 5 characters)"
          />

          {/* Question Type Select */}
          <Controller
            name="questionType"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.questionType}>
                <InputLabel id="question-type-label">
                  Question Type *
                </InputLabel>
                <Select
                  {...field}
                  labelId="question-type-label"
                  label="Question Type *"
                  disabled={isSubmitting}
                >
                  {QUESTION_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {errors.questionType && (
                  <FormHelperText>{errors.questionType.message}</FormHelperText>
                )}
              </FormControl>
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
        {/* Content Field */}
        <TextField
          {...register("content")}
          label="Content"
          fullWidth
          required={!isViewMode}
          multiline
          rows={4}
          error={!!errors.content}
          helperText={errors.content?.message}
          disabled={isSubmitting || isViewMode}
          placeholder="Enter question content (min 5 characters)"
          InputProps={{ readOnly: isViewMode }}
          InputLabelProps={{ shrink: true }}
        />

        {/* Question Type Select */}
        <Controller
          name="questionType"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.questionType}>
              <InputLabel id="question-type-label">Question Type *</InputLabel>
              <Select
                {...field}
                value={field.value ?? "MULTIPLE_CHOICE"}
                labelId="question-type-label"
                label="Question Type *"
                disabled={isSubmitting || isViewMode}
              >
                {QUESTION_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {errors.questionType && (
                <FormHelperText>{errors.questionType.message}</FormHelperText>
              )}
            </FormControl>
          )}
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
