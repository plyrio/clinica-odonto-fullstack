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
  password: z.string().min(8).optional(),
  name: z.string().min(1),
  bio: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthday: z.date(),
  imgUrl: z.string().optional().nullable(),
  role: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const responseUserPasswordSchema = z
  .object({
    id: z.number(),
    role: z.enum([
      "USER",
      "PATIENT",
      "ADMIN",
      "DOCTOR",
      "NURSE",
      "RECEPTIONIST",
      "MANAGER",
      "EMPLOYEE"
    ])
  })
  .merge(createUserSchema.extend({}));

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type ResponseUserDto = z.infer<typeof responseUserSchema>;
export type ResponseUserPasswordDto = z.infer<
  typeof responseUserPasswordSchema
>;

export class CreateUserZodDto extends createZodDto(createUserSchema) {}
export class UpdateUserZodDto extends createZodDto(updateUserSchema) {}
export class ResponseUserZodDto extends createZodDto(responseUserSchema) {}
