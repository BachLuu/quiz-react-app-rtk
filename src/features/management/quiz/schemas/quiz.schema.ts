import { z } from "zod";

/**
 * Zod Schema for Quiz validation
 * Maps directly from Java backend annotations in requirement.txt
 */

export const createQuizSchema = z
  .object({
    // @NotBlank + @Size(min=5, max=255)
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .min(5, "Title must be between 5 and 255 characters")
      .max(255, "Title must be between 5 and 255 characters"),

    // @NotBlank + @Size(max=1000)
    description: z
      .string()
      .trim()
      .min(1, "Description is required")
      .max(1000, "Description must not exceed 1000 characters"),

    // @NotNull + @Min(1) + @Max(3600)
    duration: z
      .number()
      .refine((value) => Number.isFinite(value), "Duration is required")
      .int("Duration must be a whole number")
      .min(1, "Duration must be at least 1 minute")
      .max(3600, "Duration must not exceed 3600 minutes"),

    // @Size(max=500) - Optional
    thumbnailUrl: z
      .string()
      .trim()
      .max(500, "Thumbnail URL must not exceed 500 characters")
      .optional(),

    // Default true
    isActive: z.boolean(),
  })
  .strict();

// Update schema - partial updates
export const updateQuizSchema = createQuizSchema.partial().strict();

// Infer TypeScript types from schemas
export type CreateQuizFormData = z.infer<typeof createQuizSchema>;
export type UpdateQuizFormData = z.infer<typeof updateQuizSchema>;
