import z from "zod";

/**
 * Zod Schema for User validation
 * Maps to backend validation from Java annotations
 */

export const createUserSchema = z.strictObject({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must not exceed 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must not exceed 50 characters"),
  email: z
    .email("Invalid email format")
    .min(1, "Email is required")
    .max(100, "Email must not exceed 100 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must not exceed 100 characters"),
  avatar: z
    .string()
    .max(500, "Avatar URL must not exceed 500 characters")
    .optional()
    .or(z.literal("")),
  dateOfBirth: z
    .string()
    .refine(
      (date) => !date || !isNaN(Date.parse(date)),
      "Date of birth must be a valid date"
    )
    .optional()
    .or(z.literal("")),
  roleIds: z
    .array(z.string().min(1, "Role ID cannot be empty"))
    .min(1, "At least one role must be assigned"),
  isActive: z.boolean(),
});

// Update schema - password and isActive are optional
export const updateUserSchema = z.strictObject({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must not exceed 50 characters")
    .optional(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must not exceed 50 characters")
    .optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must not exceed 100 characters")
    .optional()
    .or(z.literal("")),
  avatar: z
    .string()
    .max(500, "Avatar URL must not exceed 500 characters")
    .optional()
    .or(z.literal("")),
  dateOfBirth: z
    .string()
    .refine(
      (date) => !date || !isNaN(Date.parse(date)),
      "Date of birth must be a valid date"
    )
    .optional()
    .or(z.literal("")),
  roleIds: z
    .array(z.string().min(1, "Role ID cannot be empty"))
    .min(1, "At least one role must be assigned")
    .optional(),
  isActive: z.boolean().optional(),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
