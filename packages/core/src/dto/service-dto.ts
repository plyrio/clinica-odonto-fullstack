import {z} from "zod";
import {createZodDto} from "@anatine/zod-nestjs";

export const createServiceSchema = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  imgUrl: z.string().optional(),
  slots: z.number()
});

export const updateServiceSchema = z
  .object({id: z.number()})
  .merge(createServiceSchema.partial().extend({}));

export const responseServiceSchema = z
  .object({
    id: z.number(),
    name: z.string(),
  description: z.string().optional().nullable(),
  imgUrl: z.string().optional(),
  slots: z.number()
  }
  );

export type CreateServiceDto = z.infer<typeof createServiceSchema>;
export type UpdateServiceDto = z.infer<typeof updateServiceSchema>;
export type ResponseServiceDto = z.infer<typeof responseServiceSchema>;

export class CreateServiceZodDto extends createZodDto(createServiceSchema) {}
export class UpdateServiceZodDto extends createZodDto(updateServiceSchema) {}
export class ResponseServiceZodDto extends createZodDto(
  responseServiceSchema
) {}
