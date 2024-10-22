
import { z } from 'zod';

// Regex para validar uma data no formato 'YYYY-MM-DD'
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{0,9}$/;


// Schema para criação de usuário
export const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(1),
    birthday:z.string().regex(dateRegex).optional(), // Adicione regex para validação
    imgUrl: z.string().url().optional(),
    phone: z.string().regex(phoneRegex),
    role: z.enum(['USER', 'PATIENT', 'EMPLOYEE', 'ADMIN']).default('USER'), // Adicionar role com valor padrão
});

// Schema para atualização de usuário
export const updateUserSchema = createUserSchema.partial().extend({
    id: z.number(),
});

// Tipos inferidos dos schemas Zod
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;