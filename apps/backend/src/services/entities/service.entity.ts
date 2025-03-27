import { Employee } from 'src/employee/entities/employee.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';

export class Service {
  id: number;
  name: string;
  description?: string;
  imgUrl: string;
  slots: number;
  employees: Employee[];
  appointments: Appointment[];
}
