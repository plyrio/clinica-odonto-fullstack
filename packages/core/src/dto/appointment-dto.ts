import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const createAppointmentSchema = z.object({
    userId: z.number(),
    employeeId: z.number(),
    status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELED"]),
    date: z.date(),
    service: z.number(),
});

export const updateAppointmentSchema = createAppointmentSchema.partial().extend({
    id: z.number(),
})

export const responseAppointmentSchema = z.object({
    id: z.number(),
    date: z.date(),
    status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELED"]),
    service: z.object({name: z.string()}),
    employee: z.object({
        user: z.object({
            name: z.string(),
            email: z.string().email(),
            imgUrl: z.string().optional(),
            specialties: z.array(z.object({name: z.string()})),
        })
    })
})

export type CreateAppointmentDto = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentDto = z.infer<typeof updateAppointmentSchema>;
export type ResponseAppointmentDto = z.infer<typeof responseAppointmentSchema>;

export class CreateAppointmentZodDto extends createZodDto(createAppointmentSchema) { };
export class UpdateAppointmentZodDto extends createZodDto(updateAppointmentSchema) { };
export class ResponseAppointmentZodDto extends createZodDto(responseAppointmentSchema) { };