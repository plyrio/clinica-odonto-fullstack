import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const userPasswordSchema = z.object({
  oldpassword: z.string().min(8),
  newpassword: z.string().min(8),
});

export const updatePasswordSchema = z.object({
  id: z.number(),
}).merge(userPasswordSchema)

export type UserPasswordDto = z.infer<typeof userPasswordSchema>;
export type UpdatePasswordDto = z.infer<typeof updatePasswordSchema>;

export class UserPasswordZodDto extends createZodDto(userPasswordSchema) { };
export class UpdatePasswordZodDto extends createZodDto(updatePasswordSchema) { };