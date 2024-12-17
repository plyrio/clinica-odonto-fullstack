import {Injectable, NotFoundException} from "@nestjs/common";
import {
  createServiceSchema,
  updateServiceSchema,
  CreateServiceDto,
  UpdateServiceDto
} from "@odonto/core";
import {CommonService} from "src/common/common.service";
import {PrismaService} from "src/db/prisma.service";

@Injectable()
export class ServicesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    this.commonService.validateDto(createServiceSchema, createServiceDto);
    try {
      return await this.prismaService.service.create({
        data: {
          name: createServiceDto.name,
          description: createServiceDto.description,
          imgUrl: createServiceDto.imgUrl,
          slots: createServiceDto.slots
        }
      });
    } catch (error) {
      this.commonService.handleError(error, "Failed create service");
    }
  }

  async findAll() {
    try {
      return await this.prismaService.service.findMany({
      
      });
    } catch (error) {
      this.commonService.handleError(error, "Failed to return all services");
    }
  }

  async findOne(id: number) {
    try {
      const service = await this.prismaService.service.findUnique({
        where: {id}
      });

      if (!service) {
        throw new NotFoundException(`Not found service of ID #${id}`);
      }
      return service;
    } catch (error) {
      this.commonService.handleError(
        error,
        `An error occured while fetching the service`
      );
    }
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    this.commonService.validateDto(updateServiceSchema, updateServiceDto);
    try {
      const service = await this.prismaService.service.update({
        where: {id},
        data: updateServiceDto
      });
      return service;
    } catch (error) {
      this.commonService.handleError(
        error,
        `Failed to update service of ID #${id}`
      );
    }
  }

  async remove(id: number) {
    try {
      const service = await this.prismaService.service.findUnique({
        where: {id}
      });
      if (!service) {
        throw new NotFoundException(`Not found service of ID #${id}`);
      }

      return await this.prismaService.service.delete({
        where: {id}
      });
    } catch (error) {
      this.commonService.handleError(
        error,
        `Failed to delete service of ID #${id}`
      );
    }
  }
}
