import { z } from 'zod';

const createEmployeeSchema = z.object({
    userId: z.number(),
    role: z.enum(['DOCTOR', 'RECEPTIONIST', 'NURSE']),
    specialties: z.array(z.number()).optional(),
    services: z.array(z.number()).optional(),
});

const updateEmployeeSchema = z.object({
    id: z.number(),
});

export type CreateEmployeeDto = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeDto = z.infer<typeof updateEmployeeSchema>;
