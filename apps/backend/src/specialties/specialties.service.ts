import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Logger } from '@nestjs/common';
import { CreateSpecialtyDto, createSpecialtySchema, UpdateSpecialtyDto, updateSpecialtySchema } from '@odonto/core';
import { Specialty } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class SpecialtiesService {
  private readonly logger = new Logger(SpecialtiesService.name);

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

  async create(createSpecialtyDto: CreateSpecialtyDto): Promise<Specialty> {
    this.validateDto(createSpecialtySchema, createSpecialtyDto);

    try {
      return await this.prismaService.specialty.create({
        data: {
          name: createSpecialtyDto.name,
        },
      });
    } catch (error) {
      this.handleError(error, 'Failed to create specialty');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.specialty.findMany();
    } catch (error) {
      this.handleError(error, 'Failed to return all specialties');
    }
  }

  async findOne(id: number) {
    try {
      const speciality = await this.prismaService.specialty.findUnique({
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

  async update(id: number, updateSpecialtyDto: UpdateSpecialtyDto) {
    this.validateDto(updateSpecialtySchema, updateSpecialtyDto);

    try {
      return await this.prismaService.specialty.update({
        where: { id },
        data: updateSpecialtyDto,
      });
    } catch (error) {
      this.handleError(error, `Failed to update speciality of ID #${id}`);
    }
  }

  async remove(id: number) {
    try {
      const speciality = await this.prismaService.specialty.findUnique({
        where: { id },
      });

      if (!speciality) {
        throw new NotFoundException(`Not found speciality of ID #${id}`);
      }
      return await this.prismaService.specialty.delete({
        where: { id },
      });
    } catch (error) {
      this.handleError(error, `Failed to delete speciality of ID #${id}`);
    }
  }
}
