import { z } from 'zod';
import { dateRegex } from '../utils';

export const createAppointmentSchema = z.object({
    userId: z.number(),
    employeeId: z.number(),
    status: z.enum(['DOCTOR', 'NURSE', 'RECEPTIONIST']),
    date: z.string().regex(dateRegex),
    serviceId: z.array(z.number()),
});

export const updateAppointmentSchema = createAppointmentSchema.partial().extend({
    id: z.number(),

})

export type CreateAppointmentDto = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentDto = z.infer<typeof updateAppointmentSchema>;

