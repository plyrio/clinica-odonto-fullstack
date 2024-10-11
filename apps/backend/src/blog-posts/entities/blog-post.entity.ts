import { Doctor } from 'src/doctor/entities/doctor.entity';
import { User } from 'src/user/entities/user.entity';
import { BlogPostView } from './blog-post-view.entity';

export class BlogPost {
    id: number;
    title: string;
    content: string;
    imgUrl: string;
    doctor: Doctor;
    views: number;
    likes: number;
    likedBy: User[];
    BlogPostView: BlogPostView[];
    createdAt: Date;
    updatedAt: Date;
}
