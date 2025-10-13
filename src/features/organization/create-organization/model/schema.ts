import { z } from 'zod';

export const createOrganizationSchema = z.object({
  name: z.string().min(1, 'validation.organization_name_required'),
  description: z.string().optional(),
});

export type CreateOrganizationFormData = z.infer<typeof createOrganizationSchema>;

