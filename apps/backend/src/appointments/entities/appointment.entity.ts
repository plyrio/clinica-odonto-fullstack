import { AppointmentStatus } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';
import { Employee } from 'src/employee/entities/employee.entity'; // Corrigido para Employee
import { Service } from 'src/services/entities/service.entity';

export class Appointment {
    id: number;
    user: User;
    userId: number; // Adicionando userId para referência
    employee: Employee; // Mudado de Doctor para Employee
    employeeId: number; // Adicionando employeeId para referência
    service?: Service; // Service pode ser opcional
    serviceId?: number; // Adicionando serviceId para referência
    status: AppointmentStatus;
    date: Date;
    createdAt: Date;
}
