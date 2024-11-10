import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const signInSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export const signInResponseSchema = z.object({
    id: z.number(),
}).merge(signInSchema.omit({password: true}));


export type SignInDto = z.infer<typeof signInSchema>
export type SignInResponseDto = z.infer<typeof signInResponseSchema>

export class SignInZodDto extends createZodDto(signInSchema){};
export class SignInResponseZodDro extends createZodDto(signInResponseSchema){}