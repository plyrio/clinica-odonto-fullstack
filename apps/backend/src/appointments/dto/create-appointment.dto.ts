import { IsDateString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { AppointmentStatus } from '@prisma/client';
import { Service } from 'src/services/entities/service.entity'; // Importando Service, se necessário

export class CreateAppointmentDto {
    @IsInt()
    userId: number;

    @IsInt()
    employeeId: number; // Alterado de doctorId para employeeId

    @IsEnum(AppointmentStatus)
    status: AppointmentStatus;

    @IsDateString()
    date: Date;

    @IsOptional() // Opcional, caso não seja sempre enviado
    service?: Service; // Especificando o tipo de service
}

export class UpdateAppointmentDto {
    @IsEnum(AppointmentStatus)
    status?: AppointmentStatus;

    @IsOptional() // Caso você também queira permitir a atualização do service
    service?: Service; // Se for necessário atualizar o service
}

export class AppointmentResponseDto {
    id: number;
    userId: number;
    employeeId: number; // Alterado de doctorId para employeeId
    status: AppointmentStatus;
    date: Date;
    createdAt: Date;
}
