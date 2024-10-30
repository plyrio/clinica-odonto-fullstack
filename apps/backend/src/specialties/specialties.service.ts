import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Logger } from '@nestjs/common';
import { CreateSpecialityDto, createSpecialitySchema, UpdateSpecialityDto, updateSpecialitySchema } from '@odonto/core';
import { Speciality } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class SpecialitiesService {
  private readonly logger = new Logger(SpecialitiesService.name);

  constructor(private readonly prismaService: PrismaService) { }

  private validateDto(schema: any, dto: any): void {
    const validatedData = schema.safeParse(dto);
    if (!validatedData.success) {
      throw new BadRequestException(validatedData.error.errors);
    }
  }

  private handleError(error: any, message: string): never {
    this.logger.error(message, error);
    throw new InternalServerErrorException(message);
  }

  async create(createSpecialityDto: CreateSpecialityDto): Promise<Speciality> {
    this.validateDto(createSpecialitySchema, createSpecialityDto);

    try {
      return await this.prismaService.speciality.create({
        data: {
          name: createSpecialityDto.name,
        },
      });
    } catch (error) {
      this.handleError(error, 'Failed to create specialty');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.speciality.findMany();
    } catch (error) {
      this.handleError(error, 'Failed to return all specialties');
    }
  }

  async findOne(id: number) {
    try {
      const speciality = await this.prismaService.speciality.findUnique({
        where: { id },
      });

      if (!speciality) {
        throw new NotFoundException(`Not found speciality of ID #${id}`);
      }

      return speciality

    } catch (error) {
      this.handleError(error, 'An error occurred while fetching the speciality')
    }
  }

  async update(id: number, updateSpecialityDto: UpdateSpecialityDto) {
    this.validateDto(updateSpecialitySchema, updateSpecialityDto);

    try {
      return await this.prismaService.speciality.update({
        where: { id },
        data: updateSpecialityDto,
      });
    } catch (error) {
      this.handleError(error, `Failed to update speciality of ID #${id}`);
    }
  }

  async remove(id: number) {
    try {
      const speciality = await this.prismaService.speciality.findUnique({
        where: { id },
      });

      if (!speciality) {
        throw new NotFoundException(`Not found speciality of ID #${id}`);
      }
      return await this.prismaService.speciality.delete({
        where: { id },
      });
    } catch (error) {
      this.handleError(error, `Failed to delete speciality of ID #${id}`);
    }
  }
}
