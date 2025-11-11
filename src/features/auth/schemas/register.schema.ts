import { z } from "zod";

/**
 * Register form validation schema
 * Best practice: Centralized validation logic
 */
export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "Tên là bắt buộc")
      .min(2, "Tên phải có ít nhất 2 ký tự")
      .max(50, "Tên không được quá 50 ký tự"),

    lastName: z
      .string()
      .min(1, "Họ là bắt buộc")
      .min(2, "Họ phải có ít nhất 2 ký tự")
      .max(50, "Họ không được quá 50 ký tự"),

    email: z.string().min(1, "Email là bắt buộc").email(),

    password: z
      .string()
      .min(1, "Password là bắt buộc")
      .min(8, "Password phải có ít nhất 8 ký tự")
      .regex(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số"
      ),

    confirmPassword: z.string().min(1, "Xác nhận password là bắt buộc"),

    dateOfBirth: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          const date = new Date(val);
          const today = new Date();
          const age = today.getFullYear() - date.getFullYear();
          return age >= 13;
        },
        { message: "Bạn phải trên 13 tuổi để đăng ký" }
      ),

    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "Bạn phải đồng ý với điều khoản sử dụng",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password không khớp",
    path: ["confirmPassword"], // Error path
  });

// Infer type từ schema
export type RegisterFormData = z.infer<typeof registerSchema>;
