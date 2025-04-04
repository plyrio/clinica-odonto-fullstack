import { PrismaService } from 'src/db/prisma.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  createAppointmentSchema,
  updateAppointmentSchema,
  CreateAppointmentDto,
  UpdateAppointmentDto,
  responseAppointmentSchema,
  ResponseAppointmentDto,
} from '@odonto/core';
import { Appointment } from '@prisma/client';
import { CommonService } from 'src/common/common.service';
import { GetOccupiedHoursService } from './get-occuped-hours.service';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService,
    private readonly getOccupiedHoursService: GetOccupiedHoursService,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<ResponseAppointmentDto> {
    try {
      const dateAsDate = new Date(createAppointmentDto.date);
      const appointmentDtoWithDate = {
        ...createAppointmentDto,
        date: dateAsDate,
      };
      this.commonService.validateDto(
        createAppointmentSchema,
        appointmentDtoWithDate,
      );

      const occupiedHours = await this.getOccupiedHoursService.execute(
        createAppointmentDto.employeeId,
        dateAsDate,
      );

      const requestedTime = dateAsDate.toTimeString().slice(0, 5);
      if (occupiedHours.includes(requestedTime)) {
        throw new BadRequestException('This time slot is already taken.');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    try {
      const appointment = await this.prismaService.appointment.create({
        data: {
          user: { connect: { id: createAppointmentDto.userId } },
          employee: {
            connect: { id: createAppointmentDto.employeeId },
          },
          status: createAppointmentDto.status,
          date: createAppointmentDto.date,
          service: { connect: { id: createAppointmentDto.service } },
        },
      });
      return responseAppointmentSchema.parse(appointment);
    } catch (error) {
      this.commonService.handleError(error, 'Failed create new appointment');
    }
  }

  async findAll(): Promise<ResponseAppointmentDto[]> {
    try {
      const appointments = await this.prismaService.appointment.findMany({
        include: {
          user: true,
          employee: { include: { specialties: true } },
          service: true,
        },
        orderBy: { date: 'desc' },
      });
      this.commonService.validateDto(
        responseAppointmentSchema.array(),
        appointments,
      );
      return appointments.map((appointment) =>
        responseAppointmentSchema.parse(appointment),
      );
    } catch (error) {}
    this.commonService.handleError(Error, 'Failed to create appointment');
  }

  async findOne(id: number): Promise<ResponseAppointmentDto> {
    try {
      const appointment = await this.prismaService.appointment.findUnique({
        where: { id },
        include: {
          user: true,
          employee: { include: { specialties: true } },
          service: true,
        },
      });

      return responseAppointmentSchema.parse(appointment);
    } catch (error) {
      this.commonService.handleError(
        error,
        'An error occurred while fetching the appointment',
      );
    }
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<ResponseAppointmentDto> {
    const dateAsDate = new Date(updateAppointmentDto.date);
    const appointmentDtoWithDate = {
      ...updateAppointmentDto,
      date: dateAsDate,
    };
    this.commonService.validateDto(
      updateAppointmentSchema,
      appointmentDtoWithDate,
    );
    try {
      const appointment = await this.prismaService.appointment.update({
        where: { id },
        data: { status: updateAppointmentDto.status },
        include: {
          user: true,
          employee: { include: { specialties: true } },
          service: true,
        },
      });

      return responseAppointmentSchema.parse(appointment);
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        `Failed to update appointment of ID ${id}`,
      );
    }
  }

  async remove(id: number): Promise<ResponseAppointmentDto> {
    try {
      const appointment = await this.prismaService.appointment.findUnique({
        where: { id },
      });
      if (!appointment) {
        throw new NotFoundException(`Appointment with ID ${id} not found`);
      }
      await this.prismaService.appointment.delete({
        where: { id },
      });
      return responseAppointmentSchema.parse(appointment);
    } catch (error) {
      this.commonService.handleError(
        error,
        `Failed to delete appointment of ID #${id}`,
      );
    }
  }

  async findByEmployeeAndDate(
    employeeId: number,
    date: Date,
  ): Promise<ResponseAppointmentDto[]> {
    const year = date.getFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    const startDay = new Date(year, month, day, 0, 0, 0);
    const endDay = new Date(year, month, day, 23, 59, 59);
    try {
      const appointments = await this.prismaService.appointment.findMany({
        where: {
          employeeId,
          date: {
            gte: startDay,
            lte: endDay,
          },
        },
        include: {
          user: true,
          employee: { include: { specialties: true } },
          service: true,
        },
        orderBy: { date: 'desc' },
      });
      return appointments.map((appointment) =>
        responseAppointmentSchema.parse(appointment),
      );
    } catch (error) {
      this.commonService.handleError(
        error,
        `Not found appointment to employee od #ID ${employeeId} om day ${date}`,
      );
    }
  }
}
