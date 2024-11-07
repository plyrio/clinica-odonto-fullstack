import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { phoneRegex } from '../utils';


export const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(1),
    bio: z.string().optional().nullable(),
    phone: z.string().regex(phoneRegex).optional().nullable(),
    birthday: z.string(),
    imgUrl: z.string().url().optional().nullable(),
    role: z.enum(['USER', 'PATIENT', 'EMPLOYEE', 'ADMIN']).default('USER'), 
});


export const updateUserSchema = z.object({
    id: z.number(),
}).merge(createUserSchema.omit({ password: true })).partial()
export const userResponseSchema = z.object({
    id: z.number(),
}).merge(createUserSchema.omit({ password: true })).extend({
    birthday: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
});


export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type UserResponseDto = z.infer<typeof userResponseSchema>;

export class CreateUserZodDto extends createZodDto(createUserSchema) { };
export class UpdateUserZodDto extends createZodDto(updateUserSchema) { };
export class UserResponseZodDto extends createZodDto(userResponseSchema) { };