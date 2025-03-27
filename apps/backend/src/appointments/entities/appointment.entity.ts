import { AppointmentStatus } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import { Service } from 'src/services/entities/service.entity';

export class Appointment {
  id: number;
  user: User;
  userId: number;
  employee: Employee;
  employeeId: number;
  service?: Service;
  serviceId?: number;
  status: AppointmentStatus;
  date: Date;
  createdAt: Date;
}
