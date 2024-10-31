import { createZodDto } from "@anatine/zod-nestjs";
import { z } from "zod";

export const createBlogPostSchema = z.object({
    title: z.string(),
    content: z.string(),
    imgUrl: z.string(),
    employeeId: z.number(),
});

export const updateBlogPostSchema = createBlogPostSchema.partial().extend({
    id: z.number(),
});

export type CreateBlogPostDto = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostDto = z.infer<typeof updateBlogPostSchema>;

export class CreateBlogPostZodDto extends createZodDto(createBlogPostSchema){};
export class UpdateBlogPostZodDto extends createZodDto(updateBlogPostSchema){};
