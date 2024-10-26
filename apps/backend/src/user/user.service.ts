import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException, Logger } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, createUserSchema, updateUserSchema } from '@odonto/core';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);


  constructor(private readonly prismaService: PrismaService) { }

  private validateDto(schema: any, dto: any): void {
    const validateData = schema.safeParse(dto);
    if (!validateData.sucess){
      throw new BadRequestException(validateData.error.errors);
    }
  }

  private handleError(error: any, message: string): never {
    this.logger.error(error, message);
    throw new InternalServerErrorException(message);
  }

  async create(createUserDto: CreateUserDto) {
    // Validando os dados de entrada
    const validatedData = createUserSchema.safeParse(createUserDto);
    if (!validatedData.success) {
      throw new BadRequestException(validatedData.error.errors);
    }
     
    console.log(validatedData.data)



    // Convertendo a data de aniversário se estiver presente
    const birthdayDate = validatedData.data.birthday ? new Date(validatedData.data.birthday) : null;

    try {
      return await this.prismaService.user.create({
        data: {
          email: validatedData.data.email,
          password: validatedData.data.password,
          name: validatedData.data.name,
          phone: validatedData.data.phone ?? null,  // Garantir que o Prisma receba null, e não undefined
          imgUrl: validatedData.data.imgUrl ?? null,
          birthday: birthdayDate,
          role: validatedData.data.role,
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
        phone: true,
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


  async remove(id: number) {
    const user = await this.prismaService.user.delete({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return { message: `User with ID ${id} removed successfully` };
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
