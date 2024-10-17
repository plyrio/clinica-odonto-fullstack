import { ApiProperty } from '@nestjs/swagger';
import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsEnum,
} from 'class-validator';
import { EmployeeRole } from '@prisma/client'; // Certifique-se de que a enumeração EmployeeRole está acessível
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { BlogPost } from 'src/blog-posts/entities/blog-post.entity';

export class Employee {
    @ApiProperty({ example: 1 })
    @IsInt()
    id: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    userId: number; // ID do usuário associado

    @ApiProperty({ example: 'DOCTOR' })
    @IsEnum(EmployeeRole) // Validação para verificar se o valor é uma das opções da enumeração EmployeeRole
    role: EmployeeRole;

    @ApiProperty({ example: ['Dentistry', 'Surgery'], required: false })
    @IsOptional()
    specialties?: string[]; // Campo opcional para especialidades

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    services?: string[]; // Campo opcional para serviços

    @ApiProperty({ required: false })
    @IsOptional()
    appointments?: Appointment[]; // Campo opcional para agendamentos

    @ApiProperty({ required: false })
    @IsOptional()
    blogs?: BlogPost[]; // Campo opcional para blogs

    @ApiProperty({ example: '2023-01-01T00:00:00Z' })
    createdAt: Date;

    @ApiProperty({ example: '2023-01-02T00:00:00Z' })
    updatedAt: Date;
}
