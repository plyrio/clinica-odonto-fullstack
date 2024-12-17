import {Injectable, NotFoundException} from "@nestjs/common";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  CreateEmployeeDto,
  UpdateEmployeeDto,
  responseEmployeeSchema,
  ResponseEmployeeDto,
  CreateUserDto
} from "@odonto/core";
import {UserService} from "src/user/user.service";
import {CommonService} from "src/common/common.service";
import {PrismaService} from "src/db/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService,
    private readonly userService: UserService
  ) {}

  async create(
    createEmployeeDto: CreateEmployeeDto,
    createUserDto: CreateUserDto
  ) {
    this.commonService.validateDto(createEmployeeSchema, createEmployeeDto);
    const {password} = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      return await this.prismaService.user.create({
        data: {
          email: createUserDto.email,
          password: hashedPassword,
          name: createUserDto.name,
          bio: createUserDto.bio ? createUserDto.bio : "",
          phone: createUserDto.phone ? createUserDto.phone : "",
          birthday: createUserDto.birthday,
          imgUrl: createUserDto.imgUrl ? createUserDto.imgUrl : "",
          role: [],
          specialties: {
            connect: createEmployeeDto.specialties?.map((specialtyId) => ({
              id: specialtyId
            }))
          },
          services: {
            connect: createEmployeeDto.services?.map((serviceId) => ({
              id: serviceId
            }))
          }
        }
      });
    } catch (error) {
      this.commonService.handleError(error, "Failed create new employee");
    }
  }

  async findAll(): Promise<ResponseEmployeeDto[]> {
    try {
      const employees = await this.prismaService.user.findMany({
        where: {
          role: {
            hasSome: [
              "ADMIN",
              "DOCTOR",
              "NURSE",
              "RECEPTIONIST",
              "MANAGER",
              "EMPLOYEE"
            ]
          }
        },
        include: {
          blogs: true,
          services: true,
          specialties: true,
          }
        
      });
      this.commonService.validateDto(responseEmployeeSchema.array(), employees);
      return employees.map((employee) =>
        responseEmployeeSchema.parse(employee)
      );
    } catch (error) {
      this.commonService.handleError(error, "Failed to return all employees");
    }
  }

  async findOne(id: number): Promise<ResponseEmployeeDto> {
    try {
      const employee = await this.prismaService.user.findUnique({
        where: {
          id,
          role: {
            hasSome: [
              "ADMIN",
              "DOCTOR",
              "NURSE",
              "RECEPTIONIST",
              "MANAGER",
              "EMPLOYEE"
            ]
          }
        }
      });

      if (!employee) {
        throw new NotFoundException(`Not found employee of ID #${id}`);
      }

      this.commonService.validateDto(responseEmployeeSchema, employee);
      return responseEmployeeSchema.parse(employee);
    } catch (error) {
      this.commonService.handleError(
        error,
        `An error occurred while try fetching employee`
      );
    }
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    this.commonService.validateDto(updateEmployeeSchema, updateEmployeeDto);

    const {specialties, services, ...rest} = updateEmployeeDto;

    try {
      const employee = await this.prismaService.user.update({
        where: {id},
        data: {
          ...rest,
          specialties: specialties
            ? {set: specialties.map((specialtyId) => ({id: specialtyId}))}
            : undefined,
          services: services
            ? {set: services.map((serviceId) => ({id: serviceId}))}
            : undefined
        }
      });
    } catch (error) {
      this.commonService.handleError(
        error,
        `Failed to update employee of ID #${id}`
      );
    }
  }

  async remove(id: number) {
    try {
      const employee = await this.prismaService.user.findUnique({
        where: {id}
      });
      if (!employee) {
        throw new NotFoundException(`Not found employee of ID #${id}`);
      }
      return await this.prismaService.user.delete({
        where: {id}
      });
    } catch (error) {
      this.commonService.handleError(
        error,
        `Failed to delete employee of ID #${id}`
      );
    }
  }
}
