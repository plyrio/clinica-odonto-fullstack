import { Injectable } from '@nestjs/common';
import { createEmployeeSchema, updateEmployeeSchema, CreateEmployeeDto, UpdateEmployeeDto } from '@odonto/core';
import { CommonService } from 'src/common/common.service';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService
  ){}



  async create(createEmployeeDto: CreateEmployeeDto) {
    this.commonService.validateDto(createEmployeeSchema, createEmployeeDto)

    try {
      return await this.prismaService.employee.create({
        data: {
          userId: createEmployeeDto.userId,
          role: createEmployeeDto.role,
          specialties:{ 
            connect: createEmployeeDto.specialties?.map((specialtyId) => ({id: specialtyId}))
        },
          services:{connect: createEmployeeDto.services?.map((serviceId) => ({id: serviceId }))
        },
      }
    })
    } catch (error) {
      this.commonService.handleError(error, 'Failed create new employee')
    }
  }

  findAll() {
    return `This action returns all employee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
