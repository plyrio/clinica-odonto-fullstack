import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
  UserResponsePasswordDto,
  createUserSchema,
  updateUserSchema,
  userResponseSchema,
  updatePasswordSchema,
  UpdatePasswordDto,
} from '@odonto/core';
import { CommonService } from 'src/common/common.service';
import { PrismaService } from 'src/db/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const birthdayAsDate = new Date(createUserDto.birthday);
      const userDtoWithDate = {
        ...createUserDto,
        birthday: birthdayAsDate,
      }
      this.commonService.validateDto(createUserSchema, userDtoWithDate);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    const { password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);


    try {
      const user = await this.prismaService.user.create({
        data: {
          email: createUserDto.email,
          password: hashedPassword,
          name: createUserDto.name,
          bio: createUserDto.bio ? createUserDto.bio : '',
          phone: createUserDto.phone ? createUserDto.phone : '',
          birthday: createUserDto.birthday,
          imgUrl: createUserDto.imgUrl ? createUserDto.imgUrl : '',
          role: createUserDto.role,
        },
      });
      delete user.password
      return userResponseSchema.parse(user);
    } catch (error) {
      this.commonService.handleError(error, 'Failed to create user');
    }
  }

  async findAll(): Promise<UserResponseDto[]> {
    try {
      const users = await this.prismaService.user.findMany({});
      console.log(users);
      return users.map(user => userResponseSchema.parse(user));
    } catch (error) {
      this.commonService.handleError(error, 'Failed to return all users');
    }
  }

  async findOne(id: number): Promise<UserResponseDto> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {id}
      });

      if (!user) {
        throw new NotFoundException(`Not found user of ID ${id}`);
      }

      return userResponseSchema.parse(user)
    } catch (error) {
      this.commonService.handleError(
        error,
        'An error occurred while fetching the user',
      );
    }
  }

  async findByEmail(email: string): Promise<UserResponsePasswordDto> {
    try {
      const user = await this.prismaService.user.findUnique({where: {email}});

      if (!user) {
        throw new NotFoundException(`Not found user with Email ${email}`)
      }

      return user
    } catch (error) {
      this.commonService.handleError(error, `An error occurred  while fetching user with Email ${email} `)
    }
  }

  async remove(id: number): Promise<UserResponseDto> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      await this.prismaService.user.delete({
        where: { id },
      });

      return userResponseSchema.parse(user);
    } catch (error) {
      this.commonService.handleError(
        error,
        `Failed to delete user of ID #${id}`,
      );
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    this.commonService.validateDto(updateUserSchema, updateUserDto);

    try {
      const user = await this.prismaService.user.update({
        where: { id },
        data: { ...updateUserDto, birthday: new Date(updateUserDto.birthday) },
      });

      return userResponseSchema.parse(user);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update user of ID ${id}`,
      );
    }
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto): Promise<UserResponseDto> {
    this.commonService.validateDto(updatePasswordSchema, updatePasswordDto)

    const { newpassword, oldpassword } = updatePasswordDto;

    const user = await this.prismaService.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const isOldPassworsValid = await bcrypt.compare(oldpassword, user.password);

    if (!isOldPassworsValid) {
      throw new BadRequestException('Old password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(newpassword, 10);

    console.log(hashedNewPassword);
    try {
      const updatedUserPassword = await this.prismaService.user.update({
        where: { id },
        data: { password: hashedNewPassword },
      })
      return userResponseSchema.parse(updatedUserPassword);
    } catch (error) {
      this.commonService.handleError(error, 'Failed to update user password');
    }


  }
}
