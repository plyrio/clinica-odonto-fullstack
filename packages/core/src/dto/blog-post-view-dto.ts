import { z } from "zod";

export const createBlogPostViewSchema = z.object({
    blogpostId: z.number(),
    viewerId: z.number(),
});

export type CreateBlogPostViewDto = z.infer<typeof createBlogPostViewSchema>;