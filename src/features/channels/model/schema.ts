import { z } from 'zod';

export const createChannelSchema = z.object({
  name: z.string().min(1, 'channels.create.validation.name_required'),
  description: z.string().optional(),
});

export const updateChannelSchema = z.object({
  name: z.string().min(1, 'channels.update.validation.name_required'),
  description: z.string().optional(),
});

export type CreateChannelFormData = z.infer<typeof createChannelSchema>;
export type UpdateChannelFormData = z.infer<typeof updateChannelSchema>;

