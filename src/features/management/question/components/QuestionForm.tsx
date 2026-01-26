import { zodResolver } from "@hookform/resolvers/zod";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Controller,
  useFieldArray,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { QUESTION_TYPES } from "@/shared/types";
import {
  createQuestionSchema,
  updateQuestionSchema,
  type CreateQuestionFormData,
  type UpdateQuestionFormData,
} from "../schemas/question.schema";
import type { QuestionFormProps } from "../types";

/** Question types that support options */
const OPTION_QUESTION_TYPES = ["MULTIPLE_CHOICE", "SINGLE_CHOICE"] as const;

/** Check if question type requires options */
const hasOptionsSupport = (
  questionType: string,
): questionType is (typeof OPTION_QUESTION_TYPES)[number] =>
  OPTION_QUESTION_TYPES.includes(
    questionType as (typeof OPTION_QUESTION_TYPES)[number],
  );

/** Skeleton component for QuestionForm loading state */
const QuestionFormSkeleton = ({
  isViewMode = false,
}: {
  isViewMode?: boolean;
}) => (
  <Stack spacing={3}>
    {/* Content Field skeleton */}
    <Box>
      <Skeleton variant="text" width={70} height={20} sx={{ mb: 0.5 }} />
      <Skeleton variant="rounded" width="100%" height={120} animation="wave" />
    </Box>
    {/* Question Type Select skeleton */}
    <Box>
      <Skeleton variant="text" width={100} height={20} sx={{ mb: 0.5 }} />
      <Skeleton variant="rounded" width="100%" height={56} animation="wave" />
    </Box>
    {/* Is Active Switch skeleton */}
    <Stack direction="row" alignItems="center" spacing={1}>
      <Skeleton variant="rounded" width={42} height={26} animation="wave" />
      <Skeleton variant="text" width={60} animation="wave" />
    </Stack>
    {/* Options Section skeleton */}
    <Paper variant="outlined" sx={{ p: 2, bgcolor: "background.default" }}>
      <Stack spacing={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Skeleton variant="text" width={120} height={24} animation="wave" />
          {!isViewMode && (
            <Skeleton
              variant="rounded"
              width={100}
              height={32}
              animation="wave"
            />
          )}
        </Box>
        <Divider />
        {/* Option items skeleton */}
        {[1, 2].map((i) => (
          <Paper
            key={i}
            elevation={0}
            sx={{
              p: 2,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Skeleton
                  variant="rounded"
                  width={24}
                  height={24}
                  animation="wave"
                />
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={56}
                  animation="wave"
                />
                {!isViewMode && (
                  <Skeleton
                    variant="circular"
                    width={32}
                    height={32}
                    animation="wave"
                  />
                )}
              </Stack>
              <Stack direction="row" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Skeleton
                    variant="rounded"
                    width={24}
                    height={24}
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width={80}
                    height={20}
                    animation="wave"
                  />
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Paper>
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
 * QuestionForm Component
 * Reusable form for creating and editing questions
 * Uses React Hook Form + Zod for validation
 * Supports dynamic question options for MULTIPLE_CHOICE/SINGLE_CHOICE
 */
export const QuestionForm = ({
  mode,
  initialData,
  detailData,
  onSubmit,
  isSubmitting = false,
  isLoadingData = false,
  submitButtonText = "Save",
  onCancel,
}: QuestionFormProps) => {
  const isViewMode = mode === "view";
  const isCreateMode = mode === "create";

  // ✅ Determine data source for edit/view form
  // Both view and edit modes use detailData (which has full options)
  // Falls back to initialData if detailData not yet loaded
  const editSource = detailData ?? initialData;

  // Build initial options from edit source
  const initialOptions =
    editSource?.options?.map((opt) => ({
      id: opt.id,
      content: opt.content,
      orderIndex: opt.orderIndex,
      isCorrect: opt.isCorrect,
      isActive: opt.isActive ?? true,
    })) ?? [];

  // Separate useForm hooks for create and edit/view modes (enterprise pattern)
  const createForm = useForm<CreateQuestionFormData>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      content: "",
      questionType: "MULTIPLE_CHOICE",
      options: [
        { content: "", orderIndex: 0, isCorrect: false },
        { content: "", orderIndex: 1, isCorrect: false },
      ],
    },
  });

  // ✅ Use "values" prop to auto-sync form with async data (RHF v7.43+)
  const editForm = useForm<UpdateQuestionFormData>({
    resolver: zodResolver(updateQuestionSchema),
    values: {
      content: editSource?.content ?? "",
      questionType: editSource?.questionType ?? "MULTIPLE_CHOICE",
      isActive: editSource?.isActive ?? true,
      options: initialOptions.length > 0 ? initialOptions : undefined,
    },
  });

  // Field arrays for managing options
  const createOptionsArray = useFieldArray({
    control: createForm.control,
    name: "options",
  });

  const editOptionsArray = useFieldArray({
    control: editForm.control,
    name: "options",
  });

  // Watch question type to conditionally show options
  const createQuestionType = createForm.watch("questionType");
  const editQuestionType = editForm.watch("questionType") ?? "MULTIPLE_CHOICE";

  const onCreateSubmit: SubmitHandler<CreateQuestionFormData> = async (
    data,
  ) => {
    if (!onSubmit) return;
    await onSubmit(data);
  };

  const onEditSubmit: SubmitHandler<UpdateQuestionFormData> = async (data) => {
    if (!onSubmit) return;
    await onSubmit(data);
  };

  // Handler for adding a new option (create mode)
  const handleAddCreateOption = () => {
    createOptionsArray.append({
      content: "",
      orderIndex: createOptionsArray.fields.length,
      isCorrect: false,
    });
  };

  // Handler for adding a new option (edit mode)
  const handleAddEditOption = () => {
    editOptionsArray.append({
      content: "",
      orderIndex: editOptionsArray.fields.length,
      isCorrect: false,
      isActive: true, // Ensure new options have isActive = true
    });
  };

  // Render Create Mode Form
  if (isCreateMode) {
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = createForm;

    const showOptions = hasOptionsSupport(createQuestionType);

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

          {/* Options Section for MULTIPLE_CHOICE/SINGLE_CHOICE */}
          {showOptions && (
            <Paper
              variant="outlined"
              sx={{ p: 2, bgcolor: "background.default" }}
            >
              <Stack spacing={2}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    Answer Options
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={handleAddCreateOption}
                    disabled={isSubmitting}
                  >
                    Add Option
                  </Button>
                </Box>

                {errors.options?.message && (
                  <Typography color="error" variant="body2">
                    {errors.options.message}
                  </Typography>
                )}

                <Divider />

                {createOptionsArray.fields.map((field, index) => (
                  <Paper
                    key={field.id}
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: errors.options?.[index]
                        ? "error.main"
                        : "divider",
                      borderRadius: 1,
                    }}
                  >
                    <Stack spacing={2}>
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        justifyContent="space-between"
                      >
                        <Box display="flex" alignItems="center" gap={1}>
                          <DragIcon color="action" fontSize="small" />
                          <Typography variant="body2" color="text.secondary">
                            Option {index + 1}
                          </Typography>
                        </Box>
                        <Tooltip title="Remove option">
                          <span>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => createOptionsArray.remove(index)}
                              disabled={
                                isSubmitting ||
                                createOptionsArray.fields.length <= 2
                              }
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Box>

                      <TextField
                        {...register(`options.${index}.content`)}
                        label="Option Content"
                        fullWidth
                        size="small"
                        error={!!errors.options?.[index]?.content}
                        helperText={errors.options?.[index]?.content?.message}
                        disabled={isSubmitting}
                        placeholder="Enter option content"
                      />

                      <Box display="flex" alignItems="center" gap={2}>
                        <TextField
                          {...register(`options.${index}.orderIndex`, {
                            valueAsNumber: true,
                          })}
                          label="Order"
                          type="number"
                          size="small"
                          sx={{ width: 100 }}
                          error={!!errors.options?.[index]?.orderIndex}
                          disabled={isSubmitting}
                        />
                        <Controller
                          name={`options.${index}.isCorrect`}
                          control={control}
                          render={({ field: checkField }) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={checkField.value}
                                  onChange={(_, checked) =>
                                    checkField.onChange(checked)
                                  }
                                  disabled={isSubmitting}
                                  color="success"
                                />
                              }
                              label="Correct Answer"
                            />
                          )}
                        />
                      </Box>
                    </Stack>
                  </Paper>
                ))}

                {createOptionsArray.fields.length < 2 && (
                  <Typography color="warning.main" variant="body2">
                    At least 2 options are required for choice questions.
                  </Typography>
                )}
              </Stack>
            </Paper>
          )}

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

  const showOptions = hasOptionsSupport(editQuestionType);

  // Show skeleton while loading data for edit/view mode
  if (isLoadingData) {
    return <QuestionFormSkeleton isViewMode={isViewMode} />;
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

        {/* Options Section for MULTIPLE_CHOICE/SINGLE_CHOICE */}
        {showOptions && (
          <Paper
            variant="outlined"
            sx={{ p: 2, bgcolor: "background.default" }}
          >
            <Stack spacing={2}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  Answer Options
                </Typography>
                {!isViewMode && (
                  <Button
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={handleAddEditOption}
                    disabled={isSubmitting}
                  >
                    Add Option
                  </Button>
                )}
              </Box>

              {errors.options?.message && (
                <Typography color="error" variant="body2">
                  {errors.options.message}
                </Typography>
              )}

              <Divider />

              {editOptionsArray.fields.length === 0 ? (
                <Typography color="text.secondary" variant="body2" py={2}>
                  {isViewMode
                    ? "No options available for this question."
                    : "No options yet. Click 'Add Option' to add answer options."}
                </Typography>
              ) : (
                editOptionsArray.fields.map((field, index) => (
                  <Paper
                    key={field.id}
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: errors.options?.[index]
                        ? "error.main"
                        : "divider",
                      borderRadius: 1,
                      opacity: isViewMode
                        ? 1
                        : field.isActive === false
                          ? 0.6
                          : 1,
                    }}
                  >
                    <Stack spacing={2}>
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        justifyContent="space-between"
                      >
                        <Box display="flex" alignItems="center" gap={1}>
                          {!isViewMode && (
                            <DragIcon color="action" fontSize="small" />
                          )}
                          <Typography variant="body2" color="text.secondary">
                            Option {index + 1}
                            {field.isActive === false && " (Inactive)"}
                          </Typography>
                        </Box>
                        {!isViewMode && (
                          <Tooltip title="Remove option">
                            <span>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => editOptionsArray.remove(index)}
                                disabled={isSubmitting}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </span>
                          </Tooltip>
                        )}
                      </Box>

                      <TextField
                        {...register(`options.${index}.content`)}
                        label="Option Content"
                        fullWidth
                        size="small"
                        error={!!errors.options?.[index]?.content}
                        helperText={errors.options?.[index]?.content?.message}
                        disabled={isSubmitting || isViewMode}
                        placeholder="Enter option content"
                        InputProps={{ readOnly: isViewMode }}
                        InputLabelProps={{ shrink: true }}
                      />

                      <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                        flexWrap="wrap"
                      >
                        <TextField
                          {...register(`options.${index}.orderIndex`, {
                            valueAsNumber: true,
                          })}
                          label="Order"
                          type="number"
                          size="small"
                          sx={{ width: 100 }}
                          error={!!errors.options?.[index]?.orderIndex}
                          disabled={isSubmitting || isViewMode}
                          InputProps={{ readOnly: isViewMode }}
                          InputLabelProps={{ shrink: true }}
                        />

                        <Controller
                          name={`options.${index}.isCorrect`}
                          control={control}
                          render={({ field: checkField }) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={checkField.value}
                                  onChange={(_, checked) =>
                                    checkField.onChange(checked)
                                  }
                                  disabled={isSubmitting || isViewMode}
                                  color="success"
                                />
                              }
                              label="Correct Answer"
                            />
                          )}
                        />

                        {/* isActive toggle for existing options */}
                        {!isViewMode && field.id != null && (
                          <Controller
                            name={`options.${index}.isActive`}
                            control={control}
                            render={({ field: activeField }) => (
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={activeField.value ?? true}
                                    onChange={(_, checked) =>
                                      activeField.onChange(checked)
                                    }
                                    disabled={isSubmitting}
                                    size="small"
                                  />
                                }
                                label="Active"
                              />
                            )}
                          />
                        )}
                      </Box>
                    </Stack>
                  </Paper>
                ))
              )}
            </Stack>
          </Paper>
        )}

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
