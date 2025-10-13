import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email('validation.email_invalid').min(1, 'validation.email_required'),
  password: z.string().min(8, 'validation.password_min'),
  firstName: z.string().min(1, 'validation.first_name_required'),
  lastName: z.string().min(1, 'validation.last_name_required'),
});

export type SignupFormData = z.infer<typeof signupSchema>;

