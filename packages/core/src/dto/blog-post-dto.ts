import { createZodDto } from "@anatine/zod-nestjs";
import { z } from "zod";

export const createBlogPostSchema = z.object({
    title: z.string(),
    content: z.string(),
    imgUrl: z.string().url().optional().nullable(),
    authorId: z.number()
});

export const updateBlogPostSchema = z
    .object({ id: z.number() })
    .merge(createBlogPostSchema.partial().extend({}));

export const responseBlogPostSchema = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    imgUrl: z.string().optional().nullable(),
    views: z.number().optional(),
    likes: z.number().optional(),
    likedBy: z
        .array(
            z
                .object({
                    name: z.string(),
                    imgUrl: z.string()
                })
                .optional()
                .nullable()
    ).optional()
        ,
    updatedAt: z.date(),
    createdAt: z.date(),
    author: z.object({
        name: z.string(),
        email: z.string(),
        imgUrl: z.string().optional().nullable()
    })
});

export type CreateBlogPostDto = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostDto = z.infer<typeof updateBlogPostSchema>;
export type ResponseBlogPostDto = z.infer<typeof responseBlogPostSchema>;

export class CreateBlogPostZodDto extends createZodDto(createBlogPostSchema) {}
export class UpdateBlogPostZodDto extends createZodDto(updateBlogPostSchema) {}
export class ResponseBlogPostZodDto extends createZodDto(
    responseBlogPostSchema
) {}
