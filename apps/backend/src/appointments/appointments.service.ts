import {PrismaService} from "src/db/prisma.service";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger
} from "@nestjs/common";
import {
  createAppointmentSchema,
  updateAppointmentSchema,
  CreateAppointmentDto,
  UpdateAppointmentDto
} from "@odonto/core";
import {Appointment} from "@prisma/client";

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  private validateDto(schema: any, dto: any): void {
    const validatedData = schema.safeParse(dto);
    if (!validatedData) {
      throw new BadRequestException(validatedData.error.errors);
    }
  }

  private handleError(error: any, message: string): never {
    this.logger.error(message, error);
    throw new InternalServerErrorException(message);
  }

  async create(
    createAppointmentDto: CreateAppointmentDto
  ): Promise<Appointment> {
    this.validateDto(createAppointmentSchema, createAppointmentDto);

    return this.prismaService.appointment.create({
      data: {
        user: {connect: {id: createAppointmentDto.userId}},
        employee: {connect: {id: createAppointmentDto.employeeId}},
        status: createAppointmentDto.status,
        date: createAppointmentDto.date,
        service: {connect: {id: createAppointmentDto.service}}
      }
    });
  }

  async findAll(): Promise<Appointment[]> {
    return this.prismaService.appointment.findMany({
      select: {
        id: true,
        userId: true,
        employeeId: true,
        serviceId: true,
        status: true,
        date: true,
        createdAt: true,
        service: {
          select: {
            id: true,
            name: true
          }
        },
        user: {
          select: {
            id: true,
            name: true
          }
        },
        employee: {
          select: {
            id: true,
            user: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });
  }

  async findOne(id: number): Promise<Appointment | null> {
    return this.prismaService.appointment.findUnique({
      where: {id},
      include: {
        user: true,
        employee: true,
        service: true
      }
    });
  }


  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto
  ): Promise<Appointment> {
    return this.prismaService.appointment.update({
      where: {id},
      data: {
        status: updateAppointmentDto.status
      }
    });
  }


  async remove(id: number): Promise<Appointment> {
    return this.prismaService.appointment.delete({
      where: {id}
    });
  }
}
