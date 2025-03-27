import { Appointment } from '../entities/appointment.entity';

export default interface RepositoryAppointment {
  create(appointment: Appointment): Promise<void>;
  findByEmail(email: string): Promise<Appointment[]>;
  findByEmployeeAndDate(employee: number, date: Date): Promise<Appointment[]>;
  delete(id: number): Promise<void>;
}
