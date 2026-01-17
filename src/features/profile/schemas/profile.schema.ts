import { z } from "zod";

/**
 * Profile Update Schema
 * Validation for profile edit form
 */
export const profileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  dateOfBirth: z.string().optional(),
  avatar: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
