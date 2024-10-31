import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const createServiceSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    imgUrl: z.string().optional(),
    slots: z.number(),
});

export const updateServiceSchema = createServiceSchema.partial().extend({
    name: z.string(),
});


export type CreateServiceDto = z.infer<typeof createServiceSchema>;
export type UpdateServiceDto = z.infer<typeof updateServiceSchema>;

export class CreateServiceZodDto extends createZodDto(createServiceSchema){};
export class UpdateServiceZodDto extends createZodDto(updateServiceSchema){};