import { z } from 'zod';

export const updateOrganizationSchema = z.object({
  name: z.string().min(1, 'validation.organization_name_required'),
  description: z.string().optional(),
});

export type UpdateOrganizationFormData = z.infer<typeof updateOrganizationSchema>;

