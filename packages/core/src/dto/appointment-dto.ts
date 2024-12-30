import {z} from "zod";
import {createZodDto} from "@anatine/zod-nestjs";

const STATUS = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELED"] as const;

const statusEnum = z.enum(STATUS);

export const createAppointmentSchema = z.object({
  userId: z.number(),
  employeeId: z.number(),
  status: statusEnum,
  date: z.date().refine((val) => !isNaN(new Date(val).getTime()), {
    message: "Invalid date format"
  }),
  service: z.number()
});

export const updateAppointmentSchema = z
  .object({id: z.number()})
  .merge(createAppointmentSchema.partial().extend({}));

export const responseAppointmentSchema = z.object({
  id: z.number(),
  date: z.date(),
  status: statusEnum,
  service: z.object({
    name: z.string(),
    slots: z.number()
  }),
  user: z.object({
    id: z.number(),
    name: z.string()
  }),
  employee: z.object({
    name: z.string(),
    email: z.string().email(),
    bio: z.string(),
    imgUrl: z.string().optional(),
    specialties: z.array(z.object({name: z.string()})),
    
  })
});

export type CreateAppointmentDto = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentDto = z.infer<typeof updateAppointmentSchema>;
export type ResponseAppointmentDto = z.infer<typeof responseAppointmentSchema>;

export class CreateAppointmentZodDto extends createZodDto(
  createAppointmentSchema
) {}
export class UpdateAppointmentZodDto extends createZodDto(
  updateAppointmentSchema
) {}
export class ResponseAppointmentZodDto extends createZodDto(
  responseAppointmentSchema
) {}
