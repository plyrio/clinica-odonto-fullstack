import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const createEmployeeSchema = z.object({
    userId: z.number(),
    role: z.enum(['DOCTOR', 'RECEPTIONIST', 'NURSE']),
    specialties: z.array(z.number()).optional(),
    services: z.array(z.number()).optional(),
});

export const updateEmployeeSchema = z.object({
    id: z.number(),
});

export type CreateEmployeeDto = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeDto = z.infer<typeof updateEmployeeSchema>;

export class CreateEmployeeZodDto extends createZodDto(createEmployeeSchema){};
export class UpdateEmployeeZodDto extends createZodDto(updateEmployeeSchema){};
