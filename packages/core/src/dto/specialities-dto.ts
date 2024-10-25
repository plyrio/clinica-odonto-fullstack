import { z } from "zod";
import { createZodDto } from '@anatine/zod-nestjs';

export const createSpecialitySchema = z.object({
    name: z.string(),
})

export const updateSpecialitySchema = createSpecialitySchema.partial().extend({
    id: z.number(),
});

export type CreateSpecialityDto = z.infer<typeof createSpecialitySchema>;
export type UpdateSpecialityDto = z.infer<typeof updateSpecialitySchema>;

export class CreateSpecialityZodDto extends createZodDto(createSpecialitySchema){};
export class UpdateSpecialityZodDto extends createZodDto(updateSpecialitySchema){};