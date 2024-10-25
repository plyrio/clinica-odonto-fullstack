import { z } from "zod";

export const createBlogPostDtoSchema = z.object({
    title: z.string(),
    content: z.string(),
    imgUrl: z.string(),
    employeeId: z.number(),
});

export const updateBlogPostDtoSchema = createBlogPostDtoSchema.partial().extend({
    id: z.number(),
});

export type CreateBlogPostDto = z.infer<typeof createBlogPostDtoSchema>;
export type UpdateBlogPostDto = z.infer<typeof updateBlogPostDtoSchema>;
