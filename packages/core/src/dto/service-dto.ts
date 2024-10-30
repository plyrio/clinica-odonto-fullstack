import { z } from 'zod';

export const createServiceSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    imgUrl: z.string().optional(),
    slots: z.number(),
});

export const updateServiceSchema = createServiceSchema.partial().extend({
    name: z.string(),
});