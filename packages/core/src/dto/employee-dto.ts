import {createZodDto} from "@anatine/zod-nestjs";
import {z} from "zod";
import {phoneRegex} from "../utils";

export const ROLES = [
  "USER",
  "PATIENT",
  "ADMIN",
  "DOCTOR",
  "NURSE",
  "RECEPTIONIST",
  "MANAGER",
  "EMPLOYEE"
] as const;

const roleEnum = z.enum(ROLES);

export const createEmployeeSchema = z.object({
  email: z.string().email("Invalid email format"),
  googleId: z.string().optional().nullable(),
  password: z
    .string()
    .min(8, "Password must have at least")
    .default("12345678"),
  name: z.string().min(1, "Name cannot be empty"),
  bio: z.string().optional().nullable(),
  phone: z.string().regex(phoneRegex).optional().nullable(),
  birthday: z.date(),
  imgUrl: z.string().url("Invalid URL").optional().nullable(),
  role: z.array(roleEnum).min(1).default(["EMPLOYEE"]),
  specialties: z.array(z.number()).optional(),
  services: z.array(z.number()).optional()
});

export const updateEmployeeSchema = createEmployeeSchema
  .omit({password: true})
  .partial()
  .extend({
    id: z.number({required_error: "ID is required"})
  });

export const responseEmployeeSchema = z.object({
  id: z.number(),
  email: z.string(),
  googleId: z.string().optional().nullable(),
  name: z.string(),
  bio: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthday: z.date(),
  imgUrl: z.string().optional().nullable(),
  employeeAppointments: z.array(
    z
      .object({
        id: z.number(),
        date: z.date(),
        status: z.string(),
        service: z.object({
          id: z.number(),
          name: z.string()
        }),
        user: z.object({
          id: z.number(),
          name: z.string(),
          email: z.string()
        })
      })
      .nullable()
  ).optional(),
  specialties: z
    .array(
      z
        .object({
          id: z.number(),
          name: z.string()
        })
        .nullable()
    )
    .optional(),
  services: z
    .array(
      z
        .object({
          id: z.number(),
          name: z.string()
        })
        .nullable()
    )
    .optional(),
  blogs: z
    .array(
      z
        .object({
          id: z.number(),
          title: z.string(),
          views: z.number(),
          likes: z.number(),
          createdAt: z.date()
        })
        .nullable()
    )
    .optional(),
  role: z.array(roleEnum),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type CreateEmployeeDto = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeDto = z.infer<typeof updateEmployeeSchema>;
export type ResponseEmployeeDto = z.infer<typeof responseEmployeeSchema>;

export class CreateEmployeeZodDto extends createZodDto(createEmployeeSchema) {}
export class UpdateEmployeeZodDto extends createZodDto(updateEmployeeSchema) {}
export class ResponseEmployeeZodDto extends createZodDto(
  responseEmployeeSchema
) {}
