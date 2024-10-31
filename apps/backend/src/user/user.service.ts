import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException, Logger } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, createUserSchema, updateUserSchema } from '@odonto/core';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prismaService: PrismaService) { }

  private validateDto(schema: any, dto: any): void {
    const validateData = schema.safeParse(dto);
    if (!validateData.sucess) {
      throw new BadRequestException(validateData.error.errors);
    }
  }

  private handleError(error: any, message: string): never {
    this.logger.error(error, message);
    throw new InternalServerErrorException(message);
  }

  async create(createUserDto: CreateUserDto) {
    this.validateDto(createUserSchema, createUserDto)
    try {
      return await this.prismaService.user.create({
        data: {
          email: createUserDto.email,
          password: createUserDto.password,
          bio: createUserDto.bio,
          name: createUserDto.name,
          phone: createUserDto.phone ?? null,
          imgUrl: createUserDto.imgUrl ?? null,
          birthday: createUserDto.birthday ?? null,
          role: createUserDto.role,
        },
      });
    } catch (error) {
      this.handleError(error, 'Failed to create user')
    }
  }

  async findAll() {
    try {
      return await this.prismaService.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          birthday: true,
          phone: true,
          role: true,
          imgUrl: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      this.handleError(error, 'Failed to return all users')
    }

  }

  async findOne(id: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          birthday: true,
          role: true,
          imgUrl: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        throw new NotFoundException(`Not found user of ID ${id}`);
      }

      return user;
    } catch (error) {
      this.handleError(error, 'An error occurred while fetching the speciality')
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
      this.handleError(error, `Failed to delete user of ID #${id}`);
    }
    
  }



  async update(id: number, updateUserDto: UpdateUserDto) {
    // Validando os dados de entrada
    const validatedData = updateUserSchema.safeParse(updateUserDto);
    if (!validatedData.success) {
      throw new BadRequestException(validatedData.error.errors);
    }

    // Convertendo a data de aniversário se estiver presente
    const updatedData = {
      ...validatedData.data,
      birthday: validatedData.data.birthday ? new Date(validatedData.data.birthday) : undefined,
    };

    try {
      const user = await this.prismaService.user.update({
        where: { id },
        data: updatedData,
      });

      return user;
    } catch (error) {
      console.error('Erro ao tentar atualizar usuário:', error);
      throw new InternalServerErrorException(`Falha ao atualizar usuário com ID ${id}`);
    }
  }
}
