import {z} from "zod";
import {createZodDto} from "@anatine/zod-nestjs";

export const refreshTokenSchema = z.object({
  refreshToken: z.string()
});

export const refreshTokenResponseSchema = z
  .object({
    id: z.number(),
    email: z.string(),
    role: z.array(z.string())
  })
  .merge(refreshTokenSchema.omit({refreshToken: true}));

export const refreshTokenResponseFullSchema = z.object({
  id: z.number(),
  email: z.string(),
  role: z.array(z.string()),
  refreshToken: z.string()
});

export class RefreshTokenResponseFullZodDto extends createZodDto(
  refreshTokenResponseFullSchema
) {}
export class RefreshTokenZodDto extends createZodDto(refreshTokenSchema) {}
export class RefreshTokenResponseZodDto extends createZodDto(
  refreshTokenResponseSchema
) {}

export type RefreshTokenResponseFullDto = z.infer<
  typeof refreshTokenResponseFullSchema
>;
export type RefreshTokenDto = z.infer<typeof refreshTokenSchema>;
export type RefreshTokenResponseDto = z.infer<
  typeof refreshTokenResponseSchema
>;
