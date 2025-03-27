import { Employee } from 'src/employee/entities/employee.entity';

export class Speciality {
  id: number;
  name: string;
  description?: string;
  employees: Employee[];
}
