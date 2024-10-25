import { z } from 'zod';

export const createServiceSchema = z.object({
    name: z.string(),
    imgUrl: z.string().optional(),
    slots: z.number(),
});

export const updateServiceSchema = createServiceSchema.partial().extend({
    name: z.string(),
});
