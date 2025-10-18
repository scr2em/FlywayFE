import { z } from 'zod';

export const createOrganizationSchema = z.object({
  name: z.string().min(1, 'validation.organization_name_required'),
  subdomain: z.string()
    .min(1, 'validation.subdomain_required')
    .min(3, 'validation.subdomain_min_length')
    .max(63, 'validation.subdomain_max_length')
    .regex(/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/, 'validation.subdomain_invalid_format'),
});

export type CreateOrganizationFormData = z.infer<typeof createOrganizationSchema>;

