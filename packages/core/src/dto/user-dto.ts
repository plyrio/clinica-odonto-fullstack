import { z } from 'zod';
import { createZodDto} from '@anatine/zod-nestjs';
import { phoneRegex } from '../utils';


// Schema para criação de usuário
export const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(1),
    bio: z.string().optional(),
    phone: z.string().regex(phoneRegex),
    birthday:z.date().optional(), // Adicione regex para validação
    imgUrl: z.string().url().optional(),
    role: z.enum(['USER', 'PATIENT', 'EMPLOYEE', 'ADMIN']).default('USER'), // Adicionar role com valor padrão
});

// Schema para atualização de usuário
export const updateUserSchema = createUserSchema.omit({ password: true }).partial().extend({
    id: z.number(),
});

// Tipos inferidos dos schemas Zod
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export class CreateUserZodDto extends createZodDto(createUserSchema){};
export class UpdateUserZodDto extends createZodDto(updateUserSchema){};