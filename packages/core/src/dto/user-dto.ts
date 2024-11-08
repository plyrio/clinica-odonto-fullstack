import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { phoneRegex} from '../utils';


export const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(1),
    bio: z.string().optional(),
    phone: z.string().regex(phoneRegex).optional().or(z.literal('')),
    birthday: z.date().refine((val) => !isNaN(new Date(val).getTime()), {
    message: 'Invalid date format',
  }),
    imgUrl: z.string().url().optional().or(z.literal('')).default(''),
    role: z.enum(['USER', 'PATIENT', 'EMPLOYEE', 'ADMIN']).default('USER'), 
});


export const updateUserSchema = z.object({
    id: z.number(),
}).merge(createUserSchema.omit({ password: true })).partial().extend({
    id: z.number()
})

export const userResponseSchema = z.object({
    id: z.number(),
}).merge(createUserSchema.omit({ password: true })).extend({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const userResponsePasswordSchema = z.object({
    id: z.number(),
}).merge(createUserSchema)

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type UserResponseDto = z.infer<typeof userResponseSchema>;
export type UserResponsePasswordDto = z.infer<typeof userResponsePasswordSchema>;

export class CreateUserZodDto extends createZodDto(createUserSchema) { };
export class UpdateUserZodDto extends createZodDto(updateUserSchema) { };
export class UserResponseZodDto extends createZodDto(userResponseSchema) { };