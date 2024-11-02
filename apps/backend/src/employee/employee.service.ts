import { Injectable, NotFoundException } from '@nestjs/common';
import { createEmployeeSchema, updateEmployeeSchema, CreateEmployeeDto, UpdateEmployeeDto } from '@odonto/core';
import { CommonService } from 'src/common/common.service';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService
  ) { }



  async create(createEmployeeDto: CreateEmployeeDto) {
    this.commonService.validateDto(createEmployeeSchema, createEmployeeDto)

    try {
      return await this.prismaService.employee.create({
        data: {
          userId: createEmployeeDto.userId,
          role: createEmployeeDto.role,
          specialties: {
            connect: createEmployeeDto.specialties?.map((specialtyId) => ({ id: specialtyId }))
          },
          services: {
            connect: createEmployeeDto.services?.map((serviceId) => ({ id: serviceId }))
          },
        }
      })
    } catch (error) {
      this.commonService.handleError(error, 'Failed create new employee')
    }
  }

  async findAll() {
    try {
      return await this.prismaService.employee.findMany({})
    } catch (error) {
      this.commonService.handleError(error, 'Failed to return all employees')
    }
  }

  async findOne(id: number) {
    try {
      const employee = await this.prismaService.employee.findUnique({
        where: { id },
        include: {
          user: {
            select: { 
              name: true,
              bio: true,
              phone:true,
              email: true,
            },
          },
          specialties: {
            select: { name: true },
          },
          services: {
            select: { name: true },
          },
      }
      });

    if (!employee) {
      throw new NotFoundException(`Not found employee of ID #${id}`)
    }

    return employee
  } catch(error) {
    this.commonService.handleError(error, `An error occurred while try fetching employee`)
  }
}

async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
  this.commonService.validateDto(updateEmployeeSchema, updateEmployeeDto);

  try {
    return await this.prismaService.employee.update({
      where: {id},
      data: updateEmployeeDto,
    })
  } catch (error) {
    this.commonService.handleError(error, `Failed to update employee of ID #${id}`)
  }
}

async remove(id: number) {
  try {
    const employee = await this.prismaService.employee.findUnique({
      where: {id}
    });
    if(!employee){
      throw new NotFoundException(`Not found employee of ID #${id}`)
    }
    return await this.prismaService.employee.delete({
      where: {id}
    })
  } catch (error) {
    this.commonService.handleError(error, `Failed to delete employee of ID #${id}`)
  }
}
}
