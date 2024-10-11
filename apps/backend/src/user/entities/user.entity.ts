import { Role } from '@prisma/client';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { BlogPost } from 'src/blog-posts/entities/blog-post.entity';
import { BlogPostView } from 'src/blog-posts/entities/blog-post-view.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';

export class User {
  id: number;
  email: string;
  password: string;
  name: string;
  birthday?: Date;
  role: Role;
  appointment?: Appointment[];
  likedPosts?: BlogPost[];
  imgUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  doctor?: Doctor;
  BlogPostView?: BlogPostView[];
}
