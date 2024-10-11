import { Speciality } from 'src/specialities/entities/speciality.entity';
import { Service } from 'src/services/entities/service.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { BlogPost } from 'src/blog-posts/entities/blog-post.entity';
import { User } from 'src/user/entities/user.entity';

export class Doctor {
    id: number;
    user: User;
    specialties: Speciality[];
    services?: Service[];
    appointments?: Appointment[];
    blogs?: BlogPost[];
    createdAt: Date;
    updatedAt: Date;
}
