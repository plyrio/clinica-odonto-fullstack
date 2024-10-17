import { Role } from '@prisma/client';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { BlogPost } from 'src/blog-posts/entities/blog-post.entity';
import { BlogPostView } from 'src/blog-posts/entities/blog-post-view.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Employee } from 'src/employee/entities/employee.entity'; // Certifique-se de que o caminho esteja correto

export class User {
  id: number;
  email: string;
  password: string;
  name: string;
  phone?: string; // Campo de telefone
  birthday?: Date;
  role: Role;
  appointment?: Appointment[];
  likedPosts?: BlogPost[];
  imgUrl?: string;
  refreshToken?: string; // Novo campo
  createdAt: Date;
  updatedAt: Date;
  doctor?: Doctor; // Se necessário
  BlogPostView?: BlogPostView[];
  employee?: Employee; // Adicionando a relação com Employee
}
