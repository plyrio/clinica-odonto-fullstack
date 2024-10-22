import { ApiProperty } from '@nestjs/swagger';
import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsEnum,
} from 'class-validator';
import { EmployeeRole } from '@prisma/client'; // Importe sua enumeração EmployeeRole

export class CreateEmployeeDto {
    @ApiProperty({ example: 1, description: 'ID do usuário associado ao funcionário' })
    @IsInt()
    userId: number; // ID do usuário associado

    @ApiProperty({ example: 'DOCTOR', description: 'Papel do funcionário' })
    @IsEnum(EmployeeRole) // Validação para verificar se o valor é uma das opções da enumeração EmployeeRole
    role: EmployeeRole;

    @ApiProperty({ example: ['Dentistry', 'Surgery'], required: false, description: 'Especialidades do funcionário' })
    @IsOptional()
    specialties?: string[]; // Campo opcional para especialidades

    @ApiProperty({ example: ['Consultation', 'Surgery'], required: false, description: 'Serviços oferecidos pelo funcionário' })
    @IsOptional()
    services?: string[]; // Campo opcional para serviços

    // Se necessário, você pode adicionar outros campos ou validações conforme o modelo de Employee
}
