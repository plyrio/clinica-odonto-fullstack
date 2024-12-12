import {createZodDto} from "@anatine/zod-nestjs";
import {z} from "zod";

export const createBlogPostSchema = z.object({
  title: z.string(),
  content: z.string(),
  imgUrl: z.string(),
  employeeId: z.number()
});

export const updateBlogPostSchema = createBlogPostSchema.partial().extend({
  id: z.number()
});

export const blogPostResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  imgUrl: z.string().url().optional(),
  views: z.number().optional(),
  likes: z.number().optional(),
  likedBy: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      imgUrl: z.string()
    })
  ),
  updatedAt: z.date(),
  createdAt: z.date(),
  employee: z.object({
    user: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
      imgUrl: z.string().optional()
    })
  })
});

export type CreateBlogPostDto = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostDto = z.infer<typeof updateBlogPostSchema>;
export type BlogPostResponseDto = z.infer<typeof blogPostResponseSchema>;

export class CreateBlogPostZodDto extends createZodDto(createBlogPostSchema) {}
export class UpdateBlogPostZodDto extends createZodDto(updateBlogPostSchema) {}
export class BlogPostResponseZodDto extends createZodDto(
  blogPostResponseSchema
) {}
