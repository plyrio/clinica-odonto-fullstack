
import { EmployeeRole } from '@prisma/client';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { BlogPost } from 'src/blog-posts/entities/blog-post.entity';

export class Employee {

    id: number;
    userId: number;
    role: EmployeeRole;
    specialties?: string[];
    services?: string[];
    appointments?: Appointment[];
    blogs?: BlogPost[];
    createdAt: Date;
    updatedAt: Date;
}
