import { Injectable } from '@nestjs/common';
import { TIME_SLOT } from '../constants';
import RepositoryAppointment from './repository.appointment';
import { Appointment } from '../entities/appointment.entity';
import { Service } from 'src/services/entities/service.entity'; // Importando o modelo Service

@Injectable()
export class GetOccupiedHoursService {
    constructor(private readonly repo: RepositoryAppointment) { }

    async execute(employeeId: number, date: Date): Promise<string[]> {
        const appointments: Appointment[] = await this.repo.findByEmployeeAndDate(employeeId, date);

        const occupiedHours = appointments
            .flatMap((appointment) => {
                const appointmentDate = appointment.date;
                const slots = appointment.service ? appointment.service.slots : 0; // Garantindo que o slots seja acessado corretamente

                // Se o appointment.service for um array, devemos pegar todos os slots
                const totalSlots = Array.isArray(appointment.service)
                    ? appointment.service.reduce((total, service: Service) => total + service.slots, 0)
                    : slots;

                return Array.from({ length: totalSlots }, (_, i) =>
                    this.addMinutes(appointmentDate, i * TIME_SLOT)
                );
            })
            .map((d) => d.toTimeString().slice(0, 5));

        return occupiedHours;
    }

    private addMinutes(date: Date, minutes: number): Date {
        return new Date(date.getTime() + minutes * 60000);
    }
}
