import {z} from "zod";
import {createZodDto} from "@anatine/zod-nestjs";

export const createSpecialtySchema = z.object({
  name: z.string(),
  description: z.string().optional().nullable()
});

export const updateSpecialtySchema = z.object({id: z.number()}).merge(createSpecialtySchema.partial().extend({
  
}));

export const responseSpecialtySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional().nullable(),
});

export type CreateSpecialtyDto = z.infer<typeof createSpecialtySchema>;
export type UpdateSpecialtyDto = z.infer<typeof updateSpecialtySchema>;
export type ResponseSpecialtyDto = z.infer<typeof responseSpecialtySchema>;

export class CreateSpecialtyZodDto extends createZodDto(
  createSpecialtySchema
) {}
export class UpdateSpecialtyZodDto extends createZodDto(
  updateSpecialtySchema
) {}
export class ResponseSpecialtyZodDto extends createZodDto(
  responseSpecialtySchema
) {}
