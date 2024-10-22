import { IsInt, IsString } from 'class-validator';

export class CreateBlogPostDto {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    imgUrl: string;

    @IsInt()
    doctorId: number;
}

export class UpdateBlogPostDto {
    @IsString()
    title?: string;

    @IsString()
    content?: string;

    @IsString()
    imgUrl?: string;
}

export class BlogPostResponseDto {
    id: number;
    title: string;
    content: string;
    imgUrl: string;
    doctorId: number;
    createdAt: Date;
    updatedAt: Date;
}
