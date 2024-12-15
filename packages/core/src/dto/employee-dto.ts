import { createZodDto } from "@anatine/zod-nestjs";
import { z } from "zod";
import { phoneRegex } from '../utils';

export const createEmployeeSchema = z.object({
  email: z.string().email(),
  googleId: z.string().optional().or(z.literal('')),
  password: z.string().min(8).optional().default('12345678'),
  name: z.string().min(1),
  bio: z.string().optional(),
  phone: z.string().regex(phoneRegex).optional().or(z.literal('')),
  birthday: z.date().refine((val) => !isNaN(new Date(val).getTime()), {
    message: 'Invalid date format',
  }),
  imgUrl: z.string().url().optional().or(z.literal('')).default(''),
  role: z.array(z.enum(['USER', 'PATIENT', 'ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST', 'MANAGER', 'EMPLOYEE'])).default(['USER']),
  refreshToken: z.string().optional().or(z.literal('')),
  specialties: z.array(z.number()).optional(),
  services: z.array(z.number()).optional()
});

export const updateEmployeeSchema = createEmployeeSchema.omit({ password: true, refreshToken: true }).partial().extend({
  id: z.number(),
});

export const responseEmployeeSchema = z.object({
  id: z.number(),
  specialties: z.array(
    z
      .object({
        id: z.number(),
        name: z.string()
      })
      .optional()
  ).optional(),
  services: z.array(
    z
      .object({
        id: z.number(),
        name: z.string()
      })
      .optional()
  ).optional(),
  blogs: z.array(
    z
      .object({
        id: z.number(),
        title: z.string(),
        views: z.number(),
        likes: z.number(),
        createdAt: z.date(),
      })  
  ).optional(),
  role: z.array(
    z.enum([
      "USER",
      "PATIENT",
      "ADMIN",
      "DOCTOR",
      "NURSE",
      "RECEPTIONIST",
      "MANAGER",
    ])
  ),
}).merge(createEmployeeSchema.omit({ password: true, refreshToken: true })).extend({
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateEmployeeDto = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeDto = z.infer<typeof updateEmployeeSchema>;
export type ResponseEmployeeDto = z.infer<typeof responseEmployeeSchema>;

export class CreateEmployeeZodDto extends createZodDto(createEmployeeSchema) { }
export class UpdateEmployeeZodDto extends createZodDto(updateEmployeeSchema) { }
export class ResponseEmployeeZodDto extends createZodDto(
  responseEmployeeSchema
) { }



