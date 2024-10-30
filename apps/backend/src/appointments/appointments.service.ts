import { PrismaService } from 'src/db/prisma.service';
import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { createAppointmentSchema, updateAppointmentSchema, CreateAppointmentDto, UpdateAppointmentDto } from '@odonto/core';
import { Appointment } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name);

  constructor(private readonly prismaService: PrismaService) { }

  private validateDto(schema: any, dto: any): void {
    const validatedData = schema.safeParse(dto);
    if(!validatedData){
      throw new BadRequestException(validatedData.error.errors);
    }
  }

  private handleError(error: any, message: string): never {
    this.logger.error(message, error);
    throw new InternalServerErrorException(message);
  }



  // Método para criar um novo agendamento
  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    this.validateDto(createAppointmentSchema, createAppointmentDto)

    

    return this.prismaService.appointment.create({
      data: {
        user: { connect: { id: createAppointmentDto.userId } },
        employee: { connect: { id: createAppointmentDto.employeeId } },
        status: createAppointmentDto.status,
        date: createAppointmentDto.date,
        service:createAppointmentDto.service ?? { connect: { id: createAppointmentDto.service } }
      },
    });
  }

  // Método para retornar todos os agendamentos
  async findAll(): Promise<Appointment[]> {
    return this.prismaService.appointment.findMany({
      select: {
        id: true, // ID do agendamento
        userId: true, // ID do usuário
        employeeId: true, // ID do funcionário
        serviceId: true, // ID do serviço
        status: true, // Status do agendamento
        date: true, // Data do agendamento
        createdAt: true, // Data de criação do agendamento
        service: {
          select: {
            id: true, // ID do serviço
            name: true, // Nome do serviço
          },
        },
        user: {
          select: {
            id: true, // ID do usuário
            name: true, // Nome do usuário
          },
        },
        employee: {
          select: {
            id: true, // ID do funcionário
            user: {
              select: {
                name: true, // Nome do funcionário (médico)
              },
            },
          },
        },
      },
    });
  }



  // Método para encontrar um agendamento específico por ID
  async findOne(id: number): Promise<Appointment | null> {
    return this.prismaService.appointment.findUnique({
      where: { id },
      include: {
        user: true, // Incluindo o usuário
        employee: true, // Incluindo o funcionário
        service: true, // Incluindo o serviço, se necessário
      },
    });
  }

  // Método para atualizar um agendamento
  async update(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    return this.prismaService.appointment.update({
      where: { id },
      data: {
        status: updateAppointmentDto.status, // Atualizando status
        // Adicione mais campos aqui, se necessário
      },
    });
  }

  // Método para remover um agendamento
  async remove(id: number): Promise<Appointment> {
    return this.prismaService.appointment.delete({
      where: { id },
    });
  }
}
