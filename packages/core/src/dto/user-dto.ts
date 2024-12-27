import {z} from "zod";
import {createZodDto} from "@anatine/zod-nestjs";
import {phoneRegex} from "../utils";

export const createUserSchema = z.object({
  email: z.string().email(),
  googleId: z.string().optional().nullable(),
  password: z.string().min(8).optional(),
  name: z.string().min(1),
  bio: z.string().optional().nullable(),
  phone: z.string().regex(phoneRegex).optional().nullable(),
  birthday: z.date(),
  imgUrl: z.string().url().optional().nullable()
});

export const updateUserSchema = createUserSchema
  .omit({password: true})
  .partial()
  .extend({
    id: z.number()
  });

export const responseUserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  googleId: z.string().optional().nullable(),
  name: z.string().min(1),
  bio: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthday: z.date(),
  imgUrl: z.string().optional().nullable(),
  role: z.array(z.string()),
  patientAppointments: z
    .array(
      z
        .object({
          id: z.number(),
          date: z.date(),
          status: z.string(),
          service: z.object({
            id: z.number(),
            name: z.string()
          }),
          employee: z.object({
            id: z.number(),
            name: z.string(),
            email: z.string()
          })
        })
        .optional()
        .nullable()
    )
    .optional()
    .nullable(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const responseUserPasswordSchema = z.object({
  id: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.array(z.string())
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type ResponseUserDto = z.infer<typeof responseUserSchema>;
export type ResponseUserPasswordDto = z.infer<
  typeof responseUserPasswordSchema
>;

export class CreateUserZodDto extends createZodDto(createUserSchema) {}
export class UpdateUserZodDto extends createZodDto(updateUserSchema) {}
export class ResponseUserZodDto extends createZodDto(responseUserSchema) {}
