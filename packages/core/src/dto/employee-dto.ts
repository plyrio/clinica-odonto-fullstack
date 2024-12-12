import {createZodDto} from "@anatine/zod-nestjs";
import {z} from "zod";

export const createEmployeeSchema = z.object({
  userId: z.number(),
  role: z.enum(["DOCTOR", "RECEPTIONIST", "NURSE"]),
  specialties: z.array(z.number()).optional(),
  services: z.array(z.number()).optional()
});

export const updateEmployeeSchema = createEmployeeSchema.partial().extend({
  id: z.number()
});

export const responseEmployeeSchema = z.object({
  id: z.number(),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    imgUrl: z.string().url().optional()
  }),
  specialties: z.array(
    z
      .object({
        id: z.number(),
        name: z.string()
      })
      .optional()
  ),
  services: z.array(
    z
      .object({
        id: z.number(),
        name: z.string()
      })
      .optional()
  ),
  blogs: z.array(
    z
      .object({
        id: z.number(),
        title: z.string(),
        content: z.string()
      })
      .optional()
  ),
  role: z.string()
});

export type CreateEmployeeDto = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeDto = z.infer<typeof updateEmployeeSchema>;
export type ResponseEmployeeDto = z.infer<typeof responseEmployeeSchema>;

export class CreateEmployeeZodDto extends createZodDto(createEmployeeSchema) {}
export class UpdateEmployeeZodDto extends createZodDto(updateEmployeeSchema) {}
export class ResponseEmployeeZodDto extends createZodDto(
  responseEmployeeSchema
) {}
