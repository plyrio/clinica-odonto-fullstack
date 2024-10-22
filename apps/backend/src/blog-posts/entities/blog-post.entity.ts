import { Employee } from 'src/employee/entities/employee.entity';
import { User } from 'src/user/entities/user.entity';
import { BlogPostView } from './blog-post-view.entity';

export class BlogPost {
    id: number;
    title: string;
    content: string;
    imgUrl: string;
    employee: Employee;
    views: number;
    likes: number;
    likedBy: User[];
    BlogPostView: BlogPostView[];
    createdAt: Date;
    updatedAt: Date;
}
