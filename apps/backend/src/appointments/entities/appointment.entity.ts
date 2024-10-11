import { AppointmentStatus } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Service } from 'src/services/entities/service.entity';

export class Appointment {
    id: number;
    user: User;
    doctor: Doctor;
    service?: Service;
    status: AppointmentStatus;
    date: Date;
    createdAt: Date;
}
