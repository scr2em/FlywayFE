import { z } from 'zod';

export const inviteUserSchema = z.object({
  firstName: z.string().min(1, 'validation.first_name_required'),
  lastName: z.string().min(1, 'validation.last_name_required'),
  email: z.string().email('validation.email_invalid').min(1, 'validation.email_required'),
  roleId: z.string().min(1, 'validation.role_required'),
});

export type InviteUserFormData = z.infer<typeof inviteUserSchema>;

