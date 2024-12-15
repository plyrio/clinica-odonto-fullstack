import { Role } from '@prisma/client';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { BlogPost } from 'src/blog-posts/entities/blog-post.entity';
import { Employee } from 'src/employee/entities/employee.entity'; 

export class User {
  id: number;
  email: string;
  password: string;
  name: string;
  bio?: string;
  phone?: string; 
  birthday?: Date;
  role: Role[];
  appointment?: Appointment[];
  imgUrl?: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
  employee?: Employee;
  likedPosts?: BlogPost[]; 
}
