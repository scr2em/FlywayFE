import { z } from 'zod';

export const roleFormSchema = z.object({
  name: z.string().min(1, 'validation.role_name_required'),
  description: z.string().optional(),
  permissionCodes: z.array(z.string()).optional(),
});

export type RoleFormData = z.infer<typeof roleFormSchema>;
