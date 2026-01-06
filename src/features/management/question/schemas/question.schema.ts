import { QUESTION_TYPES } from "@/shared/types/enums";
import z from "zod";

/**
 * Zod Schema for Question validation
 * Maps to backend validation from Java annotations
 */

// Define enum values inline for z.enum compatibility

export const createQuestionSchema = z.strictObject({
  content: z
    .string()
    .min(5, "Content must be at least 5 characters")
    .max(5000, "Content must not exceed 5000 characters"),
  questionType: z.enum(QUESTION_TYPES, {
    message: "Question type is required",
  }),
});

// Update schema - all fields are optional
export const updateQuestionSchema = z.strictObject({
  content: z
    .string()
    .min(5, "Content must be at least 5 characters")
    .max(5000, "Content must not exceed 5000 characters")
    .optional(),
  questionType: z.enum(QUESTION_TYPES).optional(),
  isActive: z.boolean().optional(),
});

export type CreateQuestionFormData = z.infer<typeof createQuestionSchema>;
export type UpdateQuestionFormData = z.infer<typeof updateQuestionSchema>;
