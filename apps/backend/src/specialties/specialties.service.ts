import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger
} from "@nestjs/common";
import {
  CreateSpecialtyDto,
  createSpecialtySchema,
  UpdateSpecialtyDto,
  updateSpecialtySchema,
  responseSpecialtySchema,
  ResponseSpecialtyDto
} from "@odonto/core";
import {Specialty} from "@prisma/client";
import {PrismaService} from "src/db/prisma.service";
import {CommonService} from "src/common/common.service";

@Injectable()
export class SpecialtiesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService
  ) {}

  async create(
    createSpecialtyDto: CreateSpecialtyDto
  ): Promise<ResponseSpecialtyDto> {
    try {
      this.commonService.validateDto(createSpecialtySchema, createSpecialtyDto);
      return await this.prismaService.specialty.create({
        data: {
          name: createSpecialtyDto.name,
          description: createSpecialtyDto.description
        }
      });
    } catch (error) {
      this.commonService.handleError(error, "Failed to create specialty");
    }
  }

  async findAll(): Promise<ResponseSpecialtyDto[]> {
    try {
      const specialties = await this.prismaService.specialty.findMany();
      this.commonService.validateDto(
        responseSpecialtySchema.array(),
        specialties
      );
      return specialties.map((specialty) =>
        responseSpecialtySchema.parse(specialty)
      );
    } catch (error) {
      this.commonService.handleError(error, "Failed to return all specialties");
    }
  }

  async findOne(id: number): Promise<ResponseSpecialtyDto> {
    try {
      const specialty = await this.prismaService.specialty.findUnique({
        where: {id}
      });
      if (!specialty) {
        throw new NotFoundException(`Not found speciality of ID #${id}`);
      }

      return responseSpecialtySchema.parse(specialty);
    } catch (error) {
      this.commonService.handleError(
        error,
        "An error occurred while fetching the speciality"
      );
    }
  }

  async update(
    id: number,
    updateSpecialtyDto: UpdateSpecialtyDto
  ): Promise<{message: string; updatedSpecialty: ResponseSpecialtyDto}> {
    try {
      this.commonService.validateDto(updateSpecialtySchema, updateSpecialtyDto);

      const specialty = await this.prismaService.specialty.update({
        where: {id},
        data: updateSpecialtyDto
      });
      return {
        message: `Specialty with ID #${id} successfully update`,
        updatedSpecialty: responseSpecialtySchema.parse(specialty)
      };
    } catch (error) {
      this.commonService.handleError(
        error,
        `Failed to update speciality of ID #${id}`
      );
    }
  }

  async remove(
    id: number
  ): Promise<{message: string; deletedSpecialty: ResponseSpecialtyDto}> {
    try {
      const specialty = await this.prismaService.specialty.findUnique({
        where: {id}
      });

      if (!specialty) {
        throw new NotFoundException(`Not found speciality of ID #${id}`);
      }
      await this.prismaService.specialty.delete({
        where: {id}
      });
      return {
        message: `Specialty with ID #${id} successfully deleted`,
        deletedSpecialty: responseSpecialtySchema.parse(specialty)
      };
    } catch (error) {
      this.commonService.handleError(
        error,
        `Failed to delete speciality of ID #${id}`
      );
    }
  }
}
