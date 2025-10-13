import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('validation.email_invalid').min(1, 'validation.email_required'),
  password: z.string().min(1, 'validation.password_required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

