import { IsInt, IsOptional } from 'class-validator';

export class CreateBlogPostViewDto {
    @IsInt()
    blogPostId: number;

    @IsOptional()
    @IsInt()
    viewerId?: number;
}

export class BlogPostViewResponseDto {
    id: number;
    blogPostId: number;
    viewerId?: number;
    viewedAt: Date;
}
