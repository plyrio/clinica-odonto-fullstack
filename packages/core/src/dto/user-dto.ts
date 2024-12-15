import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { phoneRegex } from '../utils';


export const createUserSchema = z.object({
    email: z.string().email(),
    googleId: z.string().optional().or(z.literal('')),
    password: z.string().min(8).optional(),
    name: z.string().min(1),
    bio: z.string().optional(),
    phone: z.string().regex(phoneRegex).optional().or(z.literal('')),
    birthday: z.date().refine((val) => !isNaN(new Date(val).getTime()), {
        message: 'Invalid date format',
    }),
    imgUrl: z.string().url().optional().or(z.literal('')).default(''), 
    refreshToken: z.string().optional().or(z.literal('')),
});


export const updateUserSchema = createUserSchema.omit({ password: true, refreshToken: true }).partial().extend({
    id: z.number(),
});

export const responseUserSchema = z.object({
    id: z.number(),
}).merge(createUserSchema.omit({ password: true, refreshToken: true })).extend({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const responseUserPasswordSchema = z.object({
    id: z.number(),
    role: z.enum(['USER', 'PATIENT', 'ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST', 'MANAGER', 'EMPLOYEE'])
}).merge(createUserSchema.extend({}));


export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type ResponseUserDto = z.infer<typeof responseUserSchema>;
export type ResponseUserPasswordDto = z.infer<typeof responseUserPasswordSchema>;


export class CreateUserZodDto extends createZodDto(createUserSchema) { };
export class UpdateUserZodDto extends createZodDto(updateUserSchema) { };
export class ResponseUserZodDto extends createZodDto(responseUserSchema) { };