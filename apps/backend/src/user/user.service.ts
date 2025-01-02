import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException
} from "@nestjs/common";
import {
  CreateUserDto,
  UpdateUserDto,
  ResponseUserDto,
  createUserSchema,
  updateUserSchema,
  responseUserSchema,
  updatePasswordSchema,
  UpdatePasswordDto,
  refreshTokenSchema,
  RefreshTokenResponseDto,
  RefreshTokenResponseFullDto,
  RefreshTokenDto,
  refreshTokenResponseSchema,
  refreshTokenResponseFullSchema,
  ResponseUserPasswordDto,
  responseUserPasswordSchema
} from "@odonto/core";
import {CommonService} from "src/common/common.service";
import {PrismaService} from "src/db/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    try {
      const birthdayAsDate = new Date(createUserDto.birthday);
      const userDtoWithDate = {
        ...createUserDto,
        birthday: birthdayAsDate
      };
      this.commonService.validateDto(createUserSchema, userDtoWithDate);

      const {password} = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.prismaService.user.create({
        data: {
          email: createUserDto.email,
          password: hashedPassword,
          name: createUserDto.name,
          bio: createUserDto.bio,
          phone: createUserDto.phone,
          birthday: createUserDto.birthday,
          imgUrl: createUserDto.imgUrl,
          role: ["USER"]
        }
      });
      delete user.password;
      return responseUserSchema.parse(user);
    } catch (error) {
      this.commonService.handleError(error, "Failed to create user");
    }
  }

  async findAll(): Promise<ResponseUserDto[]> {
    try {
      const users = await this.prismaService.user.findMany({
        include: {
          patientAppointments: {include: {service: true, employee: true}},
        }
      });
      this.commonService.validateDto(responseUserSchema.array(), users);
      return users.map((user) => responseUserSchema.parse(user));
    } catch (error) {
      this.commonService.handleError(error, "Failed to return all users");
    }
  }

  async findOne(id: number): Promise<ResponseUserDto> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {id},
        include: {
          patientAppointments: {include: {service: true, employee: true}},
        }
      });

      if (!user) {
        throw new NotFoundException(`Not found user of ID ${id}`);
      }

      return responseUserSchema.parse(user);
    } catch (error) {
      this.commonService.handleError(
        error,
        "An error occurred while fetching the user"
      );
    }
  }

  async findByIdRefreshToken(id: number): Promise<RefreshTokenResponseFullDto> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {id}
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return refreshTokenResponseFullSchema.parse(user);
    } catch (error) {
      this.commonService.handleError(
        error,
        "An error occurred while fetching the user"
      );
    }
  }

  async findByEmail(email: string): Promise<ResponseUserPasswordDto> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {email}
      });

      if (!user) {
        throw new NotFoundException(`Not found user with Email ${email}`);
      }

      return responseUserPasswordSchema.parse(user);
    } catch (error) {
      this.commonService.handleError(
        error,
        `An error occurred  while fetching user with Email ${email} `
      );
    }
  }

  async remove(
    id: number
  ): Promise<{message: string; deletedUser: ResponseUserDto}> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {id}
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      await this.prismaService.user.delete({
        where: {id}
      });

      return {
        message: `User with ID #${id} successfully deleted`,
        deletedUser: responseUserSchema.parse(user)
      };
    } catch (error) {
      this.commonService.handleError(
        error,
        `Failed to delete user of ID #${id}`
      );
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<{message: string; updatedUser: ResponseUserDto}> {
    try {
      this.commonService.validateDto(updateUserSchema, updateUserDto);

      const user = await this.prismaService.user.update({
        where: {id},
        data: {...updateUserDto}
      });

      return {
        message: `User with ID #${id} successfully updated refreshToken`,
        updatedUser: responseUserSchema.parse(user)
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        `Failed to update user of ID ${id}`
      );
    }
  }

  async updateRefreshToken(
    id: number,
    refreshTokenDto: RefreshTokenDto
  ): Promise<{
    message: string;
    updatedRefreshToken: RefreshTokenResponseDto;
  }> {
    try {
      this.commonService.validateDto(refreshTokenSchema, refreshTokenDto);

      const user = await this.prismaService.user.update({
        where: {id},
        data: {refreshToken: refreshTokenDto.refreshToken}
      });
      return {
        message: `User with ID #${id} successfully updated refreshToken`,
        updatedRefreshToken: refreshTokenResponseSchema.parse(user)
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update refreshToken form user of ID ${id}`
      );
    }
  }

  async updatePassword(
    id: number,
    updatePasswordDto: UpdatePasswordDto
  ): Promise<{message: string; updatedPassword: ResponseUserDto}> {
    try {
      this.commonService.validateDto(updatePasswordSchema, updatePasswordDto);

      const {newpassword, oldpassword} = updatePasswordDto;

      const user = await this.prismaService.user.findUnique({
        where: {id}
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      const isOldPasswordValid = await bcrypt.compare(
        oldpassword,
        user.password
      );

      if (!isOldPasswordValid) {
        throw new BadRequestException("Old password is incorrect");
      }

      const hashedNewPassword = await bcrypt.hash(newpassword, 10);

      const updatedUserPassword = await this.prismaService.user.update({
        where: {id},
        data: {password: hashedNewPassword}
      });
      return {
        message: `User with ID #${id} successfully update password`,
        updatedPassword: responseUserSchema.parse(updatedUserPassword)
      };
    } catch (error) {
      this.commonService.handleError(error, "Failed to update user password");
    }
  }
}
