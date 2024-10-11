import { Doctor } from 'src/doctor/entities/doctor.entity';

export class Speciality {
    id: number;
    name: string;
    doctors: Doctor[];
}
