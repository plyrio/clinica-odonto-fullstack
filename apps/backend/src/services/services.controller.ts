import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from "@nestjs/common";
import {ServicesService} from "./services.service";
import {
  CreateServiceDto,
  UpdateServiceDto,
  UpdateServiceZodDto,
  CreateServiceZodDto,
  ResponseServiceZodDto
} from "@odonto/core";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam
} from "@nestjs/swagger";

@ApiTags("services")
@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiBody({type: CreateServiceZodDto})
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @ApiOperation({summary: "Retrieve a list of services"})
  @ApiResponse({
    status: 200,
    description: "Services retrieved successfully.",
    type: [ResponseServiceZodDto]
  })
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiResponse({status: 503, description: "Service unavailable."})
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(":id")
  @ApiOperation({summary: "Retrieve a service by ID"})
  @ApiParam({
    name: "id",
    description: "ID of the service to retrieve",
    type: String
  })
  @ApiResponse({
    status: 200,
    description: "Service found successfully.",
    type: ResponseServiceZodDto
  })
  @ApiResponse({status: 404, description: "Service not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  findOne(@Param("id") id: string) {
    return this.servicesService.findOne(+id);
  }

  @ApiBody({type: UpdateServiceZodDto})
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(":id")
  @ApiOperation({summary: "Delete a service by ID"})
  @ApiParam({name: "id", description: "ID of the service to delete", type: String})
  @ApiResponse({status: 200, description: "Service deleted successfully."})
  @ApiResponse({status: 404, description: "Service not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiResponse({status: 503, description: "Service unavailable."})
  remove(@Param("id") id: string) {
    return this.servicesService.remove(+id);
  }
}
