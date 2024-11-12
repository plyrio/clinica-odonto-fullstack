import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const updateRefreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export const refreshTokenResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
}).merge(updateRefreshTokenSchema.omit({ refreshToken: true }))


export class UpdateRefreshTokenZodDto extends createZodDto(updateRefreshTokenSchema) { }
export class RefreshTokenResponseZodDto extends createZodDto(refreshTokenResponseSchema) { }

export type UpdateRefreshTokenDto = z.infer<typeof updateRefreshTokenSchema>;
export type RefreshTokenResponseDto = z.infer<typeof refreshTokenResponseSchema>;

