import { IsDateString, IsEnum, IsInt } from 'class-validator';
import { AppointmentStatus } from '@prisma/client';

export class CreateAppointmentDto {
    @IsInt()
    userId: number;

    @IsInt()
    doctorId: number;

    @IsEnum(AppointmentStatus)
    status: AppointmentStatus;

    @IsDateString()
    date: Date;
}

export class UpdateAppointmentDto {
    @IsEnum(AppointmentStatus)
    status?: AppointmentStatus;
}

export class AppointmentResponseDto {
    id: number;
    userId: number;
    doctorId: number;
    status: AppointmentStatus;
    date: Date;
    createdAt: Date;
}
