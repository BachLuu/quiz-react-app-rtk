import { QUESTION_TYPES } from "@/shared/types/enums";
import z from "zod";
import {
  createQuestionOptionSchema,
  updateQuestionOptionSchema,
} from "./question-option.schema";

// Create Question Schema with conditional options validation
export const createQuestionSchema = z
  .object({
    content: z
      .string()
      .min(5, "Content must be at least 5 characters")
      .max(5000, "Content must not exceed 5000 characters"),
    questionType: z.enum(QUESTION_TYPES, {
      message: "Question type is required",
    }),
    options: z.array(createQuestionOptionSchema).optional(),
  })
  .superRefine((data, ctx) => {
    const needsOptions =
      data.questionType === "MULTIPLE_CHOICE" ||
      data.questionType === "SINGLE_CHOICE";

    if (needsOptions) {
      if (!data.options || data.options.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Multiple choice questions require at least 2 options",
          path: ["options"],
        });
        return;
      }

      // Check at least one correct answer
      const hasCorrectAnswer = data.options.some((opt) => opt.isCorrect);
      if (!hasCorrectAnswer) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one option must be marked as correct",
          path: ["options"],
        });
      }

      // For SINGLE_CHOICE, only one correct answer allowed
      if (data.questionType === "SINGLE_CHOICE") {
        const correctCount = data.options.filter((opt) => opt.isCorrect).length;
        if (correctCount > 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Single choice question can only have one correct answer",
            path: ["options"],
          });
        }
      }
    }
  });

// Update schema - all fields are optional
export const updateQuestionSchema = z
  .object({
    content: z
      .string()
      .min(5, "Content must be at least 5 characters")
      .max(5000, "Content must not exceed 5000 characters")
      .optional(),
    questionType: z.enum(QUESTION_TYPES).optional(),
    isActive: z.boolean().optional(),
    options: z.array(updateQuestionOptionSchema).optional(),
  })
  .superRefine((data, ctx) => {
    // Only validate options if they are provided
    if (data.options && data.options.length > 0) {
      const needsOptions =
        data.questionType === "MULTIPLE_CHOICE" ||
        data.questionType === "SINGLE_CHOICE";

      if (needsOptions) {
        if (data.options.length < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Multiple choice questions require at least 2 options",
            path: ["options"],
          });
          return;
        }

        // Only validate active options
        const activeOptions = data.options.filter((opt) => opt.isActive);

        // Check at least one correct answer among active options
        const hasCorrectAnswer = activeOptions.some((opt) => opt.isCorrect);
        if (activeOptions.length > 0 && !hasCorrectAnswer) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "At least one active option must be marked as correct",
            path: ["options"],
          });
        }

        // For SINGLE_CHOICE, only one correct answer allowed among active options
        if (data.questionType === "SINGLE_CHOICE") {
          const correctCount = activeOptions.filter(
            (opt) => opt.isCorrect,
          ).length;
          if (correctCount > 1) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "Single choice question can only have one correct answer",
              path: ["options"],
            });
          }
        }
      }
    }
  });

export type CreateQuestionFormData = z.infer<typeof createQuestionSchema>;
export type UpdateQuestionFormData = z.infer<typeof updateQuestionSchema>;

// Re-export option types for convenience
export type {
  CreateQuestionOptionFormData,
  UpdateQuestionOptionFormData,
} from "./question-option.schema";
