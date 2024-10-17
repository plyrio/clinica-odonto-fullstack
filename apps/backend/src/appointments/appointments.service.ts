import { PrismaService } from 'src/db/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from '@prisma/client'; // Importando Appointment para o tipo de retorno

@Injectable()
export class AppointmentsService {
  constructor(private readonly prismaService: PrismaService) { }

  // Método para criar um novo agendamento
  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const { userId, employeeId, status, date, service } = createAppointmentDto;

    return this.prismaService.appointment.create({
      data: {
        user: { connect: { id: userId } }, // Conectando o usuário
        employee: { connect: { id: employeeId } }, // Conectando o funcionário
        status,
        date,
        service: service ? { connect: { id: service.id } } : undefined, // Conectando o serviço, se fornecido
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
