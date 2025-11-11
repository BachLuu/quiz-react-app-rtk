import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email('Email không hợp lệ'),

  password: z
    .string()
    .min(1, 'Password là bắt buộc')
    .min(6, 'Password cần ít nhất 6 ký tự'),
});

export type LoginFormData = z.infer<typeof loginSchema>;