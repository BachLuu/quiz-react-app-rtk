import z from "zod";

/**
 * Zod Schema for Role validation
 * Maps to backend validation from Java annotations
 */

export const createRoleSchema = z.strictObject({
  name: z
    .string()
    .min(3, "Role name must be at least 3 characters")
    .max(50, "Role name must not exceed 50 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(50, "Description must not exceed 50 characters"),
});

// Update schema - all fields are optional
export const updateRoleSchema = z.strictObject({
  name: z
    .string()
    .min(3, "Role name must be at least 3 characters")
    .max(50, "Role name must not exceed 50 characters")
    .optional(),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(50, "Description must not exceed 50 characters")
    .optional(),
  isActive: z.boolean().optional(),
});

export type CreateRoleFormData = z.infer<typeof createRoleSchema>;
export type UpdateRoleFormData = z.infer<typeof updateRoleSchema>;
