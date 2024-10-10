import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/db/prisma.service';
import { Role } from '@prisma/client';
import { InternalServerErrorException } from '@nestjs/common';


@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const birthdayDate = new Date(createUserDto.birthday);
    try {
      return await this.prismaService.user.create({
        data: {
          ...createUserDto,
          birthday: birthdayDate,
          role: Role.USER,
        },
      });
    } catch (error) {
      console.error('Erro ao tentar criar usuário:', error);
      throw new InternalServerErrorException('Falha ao criar usuário');
    }
  }

  async findAll() {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        birthday: true,
        role: true,
        imgUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        birthday: true,
        role: true,
        imgUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async remove(id: number) {
    const user = await this.prismaService.user.delete({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return { message: `User with ID ${id} removed successfully` };
  }
}
