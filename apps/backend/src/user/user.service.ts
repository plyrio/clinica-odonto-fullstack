import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException, Logger } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserResponseDto, createUserSchema, updateUserSchema, userResponseSchema } from '@odonto/core';
import { CommonService } from 'src/common/common.service';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService
  ) { }


  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    this.commonService.validateDto(createUserSchema, createUserDto)

    const userData = {
      ...createUserDto,
      birthday: new Date(createUserDto.birthday).toISOString()
    }
    try {
      const user =  await this.prismaService.user.create({
        data: userData
      });
      return userResponseSchema.parse(user)
    } catch (error) {
      this.commonService.handleError(error, 'Failed to create user')
    }
  }

  async findAll(): Promise<UserResponseDto[]> {
    try {
      const users = await this.prismaService.user.findMany({
      });
      return users.map(user =>userResponseSchema.parse(user))
    } catch (error) {
      this.commonService.handleError(error, 'Failed to return all users')
    }

  }

  async findOne(id: number): Promise<UserResponseDto> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`Not found user of ID ${id}`);
      }

      return userResponseSchema.parse(user);
    } catch (error) {
      this.commonService.handleError(error, 'An error occurred while fetching the speciality')
    }

  }


  async remove(id: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return await this.prismaService.user.delete({ 
        where: {id},
      });
    } catch (error) {
      this.commonService.handleError(error, `Failed to delete user of ID #${id}`);
    }
    
  }



  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    this.commonService.validateDto(updateUserSchema, updateUserDto)


    try {
      const user = await this.prismaService.user.update({
        where: { id },
        data: {...updateUserDto}
      });

      return userResponseSchema.parse(user);
    } catch (error) {
      console.error('Erro ao tentar atualizar usuário:', error);
      throw new InternalServerErrorException(`Falha ao atualizar usuário com ID ${id}`);
    }
  }
}
