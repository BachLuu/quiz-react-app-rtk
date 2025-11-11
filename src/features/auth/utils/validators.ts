// utils/validators.ts
import { z } from "zod";

/**
 * Custom Zod validators
 * Best practice: Reusable validation logic
 */

// Vietnamese phone number
export const vietnamesePhone = z
  .string()
  .regex(/^(0|\+84)[0-9]{9}$/, "Số điện thoại không hợp lệ");

// Strong password
export const strongPassword = z
  .string()
  .min(8, "Password phải có ít nhất 8 ký tự")
  .regex(/(?=.*[a-z])/, "Phải có ít nhất 1 chữ thường")
  .regex(/(?=.*[A-Z])/, "Phải có ít nhất 1 chữ hoa")
  .regex(/(?=.*\d)/, "Phải có ít nhất 1 số")
  .regex(/(?=.*[@$!%*?&])/, "Phải có ít nhất 1 ký tự đặc biệt");

// Age validator
export const minimumAge = (minAge: number) =>
  z.string().refine(
    (val) => {
      const date = new Date(val);
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      return age >= minAge;
    },
    { message: `Bạn phải trên ${minAge} tuổi` }
  );
