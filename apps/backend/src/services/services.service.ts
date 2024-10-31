import { Injectable } from '@nestjs/common';
import { createServiceSchema, updateServiceSchema, CreateServiceDto, UpdateServiceDto } from '@odonto/core';
import { CommonService } from 'src/common/common.service';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class ServicesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService
  ){};

  async create(createServiceDto: CreateServiceDto) {
    this.commonService.validateDto(createServiceSchema, createServiceDto)
    try {
      return await this.prismaService.service.create({
        data: {
          name: createServiceDto.name,
          description: createServiceDto.description,
          imgUrl: createServiceDto.imgUrl,
          slots: createServiceDto.slots,
        }
      })
    } catch (error) {
      this.commonService.handleError(error, 'Failed create service')
    }
  }

  async findAll() {
    try {
      
    } catch (error) {
      this.commonService.handleError(error, 'Failed to return all services')
    }
    return `This action returns all services`;
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
