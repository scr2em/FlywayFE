import { z } from 'zod';

export const createAppSchema = z.object({
  bundleId: z
    .string()
    .min(1, 'apps.create.validation.bundle_id_required')
    .regex(
      /^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)+$/i,
      'apps.create.validation.bundle_id_invalid'
    ),
  name: z.string().min(1, 'apps.create.validation.name_required'),
  description: z.string().optional(),
});

export type CreateAppFormData = z.infer<typeof createAppSchema>;

