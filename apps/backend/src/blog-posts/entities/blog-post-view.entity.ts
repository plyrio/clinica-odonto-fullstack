import { User } from 'src/user/entities/user.entity';
import { BlogPost } from './blog-post.entity';

export class BlogPostView {
    id: number;
    blogPostId: number;
    blogPost: BlogPost;
    viewerId?: number;
    viewer?: User;
    viewedAt: Date;
}
