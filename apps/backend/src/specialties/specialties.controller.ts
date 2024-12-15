import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from "@nestjs/common";
import {SpecialtiesService} from "./specialties.service";
import {
  UpdateSpecialtyDto,
  CreateSpecialtyDto,
  UpdateSpecialtyZodDto,
  CreateSpecialtyZodDto
} from "@odonto/core";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam
} from "@nestjs/swagger";

@ApiTags("specialities")
@Controller("specialities")
export class SpecialitiesController {
  constructor(private readonly specialitiesService: SpecialtiesService) {}

  @ApiOperation({summary: "Create a new specialty."})
  @ApiResponse({status: 201, description: "Specialty successfully created"})
  @ApiResponse({status: 400, description: "Invalid data."})
  @ApiBody({type: CreateSpecialtyZodDto})
  @Post()
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialitiesService.create(createSpecialtyDto);
  }

  @Get()
  @ApiOperation({summary: "Retrieve a list of specialties"})
  @ApiResponse({
    status: 200,
    description: "Specialties retrieved successfully.",
    type: [CreateSpecialtyZodDto]
  })
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiResponse({status: 503, description: "Service unavailable."})
  findAll() {
    return this.specialitiesService.findAll();
  }

  @Get(":id")
  @ApiOperation({summary: "Retrieve a specialties by ID"})
  @ApiParam({
    name: "id",
    description: "ID of the specialties to retrieve",
    type: String
  })
  @ApiResponse({
    status: 200,
    description: "Specialties found successfully.",
    type: CreateSpecialtyZodDto
  })
  @ApiResponse({status: 404, description: "Specialties not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  findOne(@Param("id") id: string) {
    return this.specialitiesService.findOne(+id);
  }

  @ApiBody({type: UpdateSpecialtyZodDto})
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSpecialtyDto: UpdateSpecialtyDto
  ) {
    return this.specialitiesService.update(+id, updateSpecialtyDto);
  }

  @Delete(":id")
  @ApiOperation({summary: "Delete a specialty by ID"})
  @ApiParam({
    name: "id",
    description: "ID of the specialty to delete",
    type: String
  })
  @ApiResponse({status: 200, description: "Specialty deleted successfully."})
  @ApiResponse({status: 404, description: "Specialty not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiResponse({status: 503, description: "Service unavailable."})
  remove(@Param("id") id: string) {
    return this.specialitiesService.remove(+id);
  }
}
