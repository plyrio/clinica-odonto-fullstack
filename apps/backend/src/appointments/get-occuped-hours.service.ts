import {Injectable} from "@nestjs/common";
import {TIME_SLOT} from "./constants";
import {PrismaService} from "src/db/prisma.service";
import {Service} from "../services/entities/service.entity";
import {CommonService} from "src/common/common.service";
import {responseAppointmentSchema, ResponseAppointmentDto} from "@odonto/core";

@Injectable()
export class GetOccupiedHoursService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(employeeId: number, date: Date): Promise<any[]> {
    const year = date.getFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    const startDay = new Date(year, month, day, 0, 0, 0);
    const endDay = new Date(year, month, day, 23, 59, 59);

    const appointments = await this.prismaService.appointment.findMany({
      where: {
        employeeId,
        date: {
          gte: startDay,
          lte: endDay
        },
        
      },
      include: {
          service: true
        }
    });

    const occupiedHours = appointments
      .flatMap((appointment) => {
        const appointmentDate = appointment.date;
        const slots = appointment.service ? appointment.service.slots : 0;

        const totalSlots = Array.isArray(appointment.service)
          ? appointment.service.reduce(
              (total, service: Service) => total + service.slots,
              0
            )
          : slots;

        return Array.from({length: totalSlots}, (_, i) =>
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
