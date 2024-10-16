import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';

export class Service {
    id: number;
    name: string;
    imgUrl: string;
    slots: number;
    doctors: Doctor[];
    appointments: Appointment[];
}
