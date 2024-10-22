import { Role } from '@prisma/client';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { BlogPost } from 'src/blog-posts/entities/blog-post.entity';
import { BlogPostView } from 'src/blog-posts/entities/blog-post-view.entity';
import { Employee } from 'src/employee/entities/employee.entity'; 

export class User {
  id: number;
  email: string;
  password: string;
  name: string;
  phone?: string; 
  birthday?: Date;
  role: Role;
  appointment?: Appointment[];
  likedPosts?: BlogPost[];
  imgUrl?: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
  BlogPostView?: BlogPostView[];
  employee?: Employee;
}
