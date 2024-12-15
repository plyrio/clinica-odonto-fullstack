import { z } from "zod";
import { createZodDto } from '@anatine/zod-nestjs';

export const createSpecialtySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
})

export const updateSpecialtySchema = createSpecialtySchema.partial().extend({
    id: z.number(),
});

export const responseSpecialtySchema = z.object({
    id: z.number(),
}).merge(createSpecialtySchema.extend({
    createdAt: z.date(),
    updatedAt: z.date(),
}));

export type CreateSpecialtyDto = z.infer<typeof createSpecialtySchema>;
export type UpdateSpecialtyDto = z.infer<typeof updateSpecialtySchema>;
export type ResponseSpecialtyDto = z.infer<typeof responseSpecialtySchema>;

export class CreateSpecialtyZodDto extends createZodDto(createSpecialtySchema) { };
export class UpdateSpecialtyZodDto extends createZodDto(updateSpecialtySchema) { };
export class ResponseSpecialtyZodDto extends createZodDto(responseSpecialtySchema) { };