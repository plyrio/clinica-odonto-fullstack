import { z } from "zod";
import { createZodDto } from "@anatine/zod-nestjs";

export const likePostSchema = z.object({
    userId: z.number(),
});

export type LikePostDto = z.infer<typeof likePostSchema>;

export class LikePostZodDto extends createZodDto(likePostSchema) {}