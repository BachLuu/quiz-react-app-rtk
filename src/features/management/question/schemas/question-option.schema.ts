import z from "zod";

/**
 * Zod Schema for Question Option validation
 * Maps to backend validation from Java annotations
 */

// Create Question Option Schema (for new questions)
export const createQuestionOptionSchema = z.object({
  content: z
    .string()
    .min(1, "Option content is required")
    .max(5000, "Option content must not exceed 5000 characters"),
  orderIndex: z.number().int().min(0, "Order index must be at least 0"),
  isCorrect: z.boolean(),
});

// Update Question Option Schema (for existing questions)
export const updateQuestionOptionSchema = z.object({
  id: z.uuid().optional(), // null/undefined = create new
  content: z
    .string()
    .min(1, "Option content is required")
    .max(5000, "Option content must not exceed 5000 characters"),
  orderIndex: z.number().int().min(0, "Order index must be at least 0"),
  isCorrect: z.boolean(),
  isActive: z.boolean(),
});

// Inferred types
export type CreateQuestionOptionFormData = z.infer<
  typeof createQuestionOptionSchema
>;
export type UpdateQuestionOptionFormData = z.infer<
  typeof updateQuestionOptionSchema
>;
