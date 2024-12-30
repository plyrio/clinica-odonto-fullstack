import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from "@nestjs/common";
import {SpecialtiesService} from "./specialties.service";
import {
  UpdateSpecialtyDto,
  CreateSpecialtyDto,
  UpdateSpecialtyZodDto,
  CreateSpecialtyZodDto,
  ResponseSpecialtyZodDto
} from "@odonto/core";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth
} from "@nestjs/swagger";
import {AuthGuard} from "../auth/auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles.decorator";

@ApiTags("Specialties")
@Controller("specialties")
export class SpecialtiesController {
  constructor(private readonly specialtiesService: SpecialtiesService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "MANAGER")
  @ApiBearerAuth("access-token")
  @ApiOperation({
    summary: "Create a new specialty.",
    description:
      "This endpoint requires a valid access token. Only users with ADMIN or MANAGER roles are authorized to perform this operation."
  })
  @ApiResponse({
    status: 201,
    description: "Specialty successfully created.",
    type: ResponseSpecialtyZodDto
  })
  @ApiResponse({status: 400, description: "Invalid data provided."})
  @ApiResponse({
    status: 403,
    description: "Forbidden. Insufficient permissions."
  })
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiResponse({status: 503, description: "Service unavailable."})
  @ApiBody({type: CreateSpecialtyZodDto})
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtiesService.create(createSpecialtyDto);
  }

  @Get()
  @ApiOperation({
    summary: "Retrieve a list of specialties.",
    description: "Fetches a list of all registered specialties."
  })
  @ApiResponse({
    status: 200,
    description: "Specialties retrieved successfully.",
    type: [ResponseSpecialtyZodDto]
  })
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiResponse({status: 503, description: "Service unavailable."})
  findAll() {
    return this.specialtiesService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Retrieve a specialty by ID.",
    description: "Fetch details of a specific specialty using its ID."
  })
  @ApiParam({
    name: "id",
    description: "ID of the specialty to retrieve.",
    type: String
  })
  @ApiResponse({
    status: 200,
    description: "Specialty found successfully.",
    type: ResponseSpecialtyZodDto
  })
  @ApiResponse({status: 404, description: "Specialty not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiResponse({status: 503, description: "Service unavailable."})
  findOne(@Param("id") id: string) {
    return this.specialtiesService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "MANAGER")
  @ApiBearerAuth("access-token")
  @ApiOperation({
    summary: "Update a specialty by ID.",
    description:
      "This endpoint requires a valid access token. Only users with ADMIN or MANAGER roles are authorized to perform this operation."
  })
  @ApiParam({
    name: "id",
    description: "ID of the specialty to update.",
    type: String
  })
  @ApiResponse({
    status: 200,
    description: "Specialty updated successfully.",
    type: ResponseSpecialtyZodDto
  })
  @ApiResponse({status: 400, description: "Invalid data provided."})
  @ApiResponse({
    status: 403,
    description: "Forbidden. Insufficient permissions."
  })
  @ApiResponse({status: 404, description: "Specialty not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiResponse({status: 503, description: "Service unavailable."})
  @ApiBody({type: UpdateSpecialtyZodDto})
  update(
    @Param("id") id: string,
    @Body() updateSpecialtyDto: UpdateSpecialtyDto
  ) {
    return this.specialtiesService.update(+id, updateSpecialtyDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "MANAGER")
  @ApiBearerAuth("access-token")
  @ApiOperation({
    summary: "Delete a specialty by ID.",
    description:
      "This endpoint requires a valid access token. Only users with ADMIN or MANAGER roles are authorized to perform this operation."
  })
  @ApiParam({
    name: "id",
    description: "ID of the specialty to delete.",
    type: String
  })
  @ApiResponse({
    status: 200,
    description: "Specialty deleted successfully.",
    type: ResponseSpecialtyZodDto
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden. Insufficient permissions."
  })
  @ApiResponse({status: 404, description: "Specialty not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiResponse({status: 503, description: "Service unavailable."})
  remove(@Param("id") id: string) {
    return this.specialtiesService.remove(+id);
  }
}
