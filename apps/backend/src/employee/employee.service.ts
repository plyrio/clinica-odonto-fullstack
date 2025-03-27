import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  updateEmployeeRoleSchema,
  CreateEmployeeDto,
  UpdateEmployeeDto,
  UpdateEmployeeRoleDto,
  responseEmployeeSchema,
  ResponseEmployeeDto,
} from '@odonto/core';
import { UserService } from 'src/user/user.service';
import { CommonService } from 'src/common/common.service';
import { PrismaService } from 'src/db/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService,
    private readonly userService: UserService,
  ) {}

  async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<ResponseEmployeeDto> {
    try {
      const birthdayAsDate = new Date(createEmployeeDto.birthday);
      const employeeDtoWithDate = {
        ...createEmployeeDto,
        birthday: birthdayAsDate,
      };
      this.commonService.validateDto(createEmployeeSchema, employeeDtoWithDate);

      const { password } = createEmployeeDto;
      const hashedPassword = await bcrypt.hash(password, 10);

      const roles = createEmployeeDto.role;

      const employee = await this.prismaService.user.create({
        data: {
          email: createEmployeeDto.email,
          password: hashedPassword,
          name: createEmployeeDto.name,
          bio: createEmployeeDto.bio,
          phone: createEmployeeDto.phone,
          birthday: createEmployeeDto.birthday,
          imgUrl: createEmployeeDto.imgUrl,
          role: roles?.includes('EMPLOYEE')
            ? roles
            : ['EMPLOYEE', ...(roles || [])],
          specialties: roles?.includes('DOCTOR')
            ? {
                connect: createEmployeeDto.specialties?.map((specialtyId) => ({
                  id: specialtyId,
                })),
              }
            : undefined,
          services: roles?.includes('DOCTOR')
            ? {
                connect: createEmployeeDto.services?.map((serviceId) => ({
                  id: serviceId,
                })),
              }
            : undefined,
        },
      });
      return responseEmployeeSchema.parse(employee);
    } catch (error) {
      this.commonService.handleError(error, 'Failed create new employee');
    }
  }

  async findAll(): Promise<ResponseEmployeeDto[]> {
    try {
      const employees = await this.prismaService.user.findMany({
        where: {
          role: {
            hasSome: [
              'ADMIN',
              'DOCTOR',
              'NURSE',
              'RECEPTIONIST',
              'MANAGER',
              'EMPLOYEE',
            ],
          },
        },
        include: {
          blogs: true,
          services: true,
          specialties: true,
          employeeAppointments: { include: { service: true, user: true } },
        },
        orderBy: {
          id: 'asc',
        },
      });
      this.commonService.validateDto(responseEmployeeSchema.array(), employees);
      return employees.map((employee) =>
        responseEmployeeSchema.parse(employee),
      );
    } catch (error) {
      this.commonService.handleError(error, 'Failed to return all employees');
    }
  }

  async findAllDoctors(): Promise<ResponseEmployeeDto[]> {
    try {
      const doctors = await this.prismaService.user.findMany({
        where: {
          role: {
            hasSome: ['DOCTOR'],
          },
        },
        include: {
          blogs: true,
          services: true,
          specialties: true,
        },
        orderBy: {
          id: 'asc',
        },
      });
      this.commonService.validateDto(responseEmployeeSchema.array(), doctors);
      return doctors.map((doctor) => responseEmployeeSchema.parse(doctor));
    } catch (error) {
      this.commonService.handleError(error, 'Failed to return all doctors');
    }
  }

  async findOne(id: number): Promise<ResponseEmployeeDto> {
    try {
      const employee = await this.prismaService.user.findUnique({
        where: {
          id,
          role: {
            hasSome: [
              'ADMIN',
              'DOCTOR',
              'NURSE',
              'RECEPTIONIST',
              'MANAGER',
              'EMPLOYEE',
            ],
          },
        },
      });

      if (!employee) {
        throw new NotFoundException(`Not found employee of ID #${id}`);
      }
      return responseEmployeeSchema.parse(employee);
    } catch (error) {
      this.commonService.handleError(
        error,
        `An error occurred while try fetching employee`,
      );
    }
  }

  async findOneDoctor(id: number): Promise<ResponseEmployeeDto> {
    try {
      const doctor = await this.prismaService.user.findUnique({
        where: {
          id,
          role: { hasSome: ['DOCTOR'] },
        },
        include: {
          blogs: true,
          services: true,
          specialties: true,
          employeeAppointments: { include: { service: true, user: true } },
        },
      });

      if (!doctor) {
        throw new NotFoundException(`Not found doctor of ID #${id}`);
      }
      return responseEmployeeSchema.parse(doctor);
    } catch (error) {
      this.commonService.handleError(
        error,
        `An error occurred while try fetching doctor`,
      );
    }
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<{ message: string; responseEmployee: ResponseEmployeeDto }> {
    try {
      this.commonService.validateDto(updateEmployeeSchema, updateEmployeeDto);

      const { specialties, services, ...rest } = updateEmployeeDto;
      const employee = await this.prismaService.user.findUnique({
        where: { id },
        select: { role: true },
      });
      if (!employee) {
        throw new Error(`Employee with ID #${id} not found`);
      }

      const isDoctor = employee.role?.includes('DOCTOR');

      const updatedEmployee = await this.prismaService.user.update({
        where: { id },
        data: {
          ...rest,
          specialties:
            isDoctor && specialties !== undefined
              ? { set: specialties.map((specialtyId) => ({ id: specialtyId })) }
              : undefined,
          services:
            isDoctor && services !== undefined
              ? { set: services.map((serviceId) => ({ id: serviceId })) }
              : undefined,
        },
      });
      return {
        message: `Employee with ID #${id} successfully updated `,
        responseEmployee: responseEmployeeSchema.parse(updatedEmployee),
      };
    } catch (error) {
      this.commonService.handleError(
        error,
        `Failed to update employee of ID #${id}`,
      );
    }
  }

  async updateRole(
    id: number,
    updateEmployeeRoleDto: UpdateEmployeeRoleDto,
  ): Promise<{ message: string; responseEmployee: ResponseEmployeeDto }> {
    try {
      this.commonService.validateDto(
        updateEmployeeRoleSchema,
        updateEmployeeRoleDto,
      );

      const employee = await this.prismaService.user.findUnique({
        where: { id },
      });
      if (!employee) {
        throw new Error(`Employee with ID #${id} not found`);
      }

      const isDoctor = updateEmployeeRoleDto.role?.includes('DOCTOR');

      const { role, specialties, services } = updateEmployeeRoleDto;

      const updatedEmployeeRole = await this.prismaService.user.update({
        where: { id },
        data: {
          role,
          specialties:
            isDoctor && specialties !== undefined
              ? {
                  set: specialties.map((specialtyId) => ({ id: specialtyId })),
                }
              : undefined,
          services:
            isDoctor && services !== undefined
              ? { set: services.map((serviceId) => ({ id: serviceId })) }
              : undefined,
        },
      });

      return {
        message: `Employee with ID #${id} successfully updated role`,
        responseEmployee: responseEmployeeSchema.parse(updatedEmployeeRole),
      };
    } catch (error) {
      console.error('Error occurred:', error);
      this.commonService.handleError(
        error,
        `Failed to update employee of ID #${id}`,
      );
    }
  }

  async remove(id: number) {
    try {
      const employee = await this.prismaService.user.findUnique({
        where: { id },
      });
      if (!employee) {
        throw new NotFoundException(`Not found employee of ID #${id}`);
      }
      return await this.prismaService.user.delete({
        where: { id },
      });
    } catch (error) {
      this.commonService.handleError(
        error,
        `Failed to delete employee of ID #${id}`,
      );
    }
  }
}
