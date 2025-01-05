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
import { ServicesService } from "./services.service";
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
    ApiParam,
    ApiBearerAuth
} from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";

@ApiTags("services")
@Controller("services")
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("ADMIN", "MANAGER")
    @ApiBearerAuth("access-token")
    @ApiOperation({
        summary: "Create a new service.",
        description:
            "This endpoint requires a valid access token. Only users with ADMIN or MANAGER roles are authorized to perform this operation."
    })
    @ApiResponse({
        status: 201,
        description: "Service successfully created.",
        type: ResponseServiceZodDto
    })
    @ApiResponse({ status: 400, description: "Invalid data provided." })
    @ApiResponse({
        status: 403,
        description: "Forbidden. Insufficient permissions."
    })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    @ApiBody({ type: CreateServiceZodDto })
    create(@Body() createServiceDto: CreateServiceDto) {
        return this.servicesService.create(createServiceDto);
    }

    @Get()
    @ApiOperation({
        summary: "Retrieve a list of services",
        description: "Fetches a list of all registered services."
    })
    @ApiResponse({
        status: 200,
        description: "Services retrieved successfully.",
        type: [ResponseServiceZodDto]
    })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    findAll() {
        return this.servicesService.findAll();
    }

    @Get(":id")
    @ApiOperation({
        summary: "Retrieve a service by ID",
        description: "Fetch details of a specific services using its ID."
    })
    @ApiParam({
        name: "id",
        description: "ID of the service to retrieve",
        type: String,
        required: true
    })
    @ApiResponse({
        status: 200,
        description: "Service found successfully.",
        type: ResponseServiceZodDto
    })
    @ApiResponse({ status: 404, description: "Service not found." })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    findOne(@Param("id") id: string) {
        return this.servicesService.findOne(+id);
    }

    @Patch(":id")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("ADMIN", "MANAGER")
    @ApiBearerAuth("access-token")
    @ApiOperation({
        summary: "Update a service by ID.",
        description:
            "This endpoint requires a valid access token. Only users with ADMIN or MANAGER roles are authorized to perform this operation."
    })
    @ApiParam({
        name: "id",
        description: "ID of the service to update.",
        type: String,
        required: true
    })
    @ApiResponse({
        status: 200,
        description: "Service updated successfully.",
        type: ResponseServiceZodDto
    })
    @ApiResponse({ status: 400, description: "Invalid data provided." })
    @ApiResponse({
        status: 403,
        description: "Forbidden. Insufficient permissions."
    })
    @ApiResponse({ status: 404, description: "Specialty not found." })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    @ApiBody({ type: UpdateServiceZodDto })
    update(
        @Param("id") id: string,
        @Body() updateServiceDto: UpdateServiceDto
    ) {
        return this.servicesService.update(+id, updateServiceDto);
    }

    @Delete(":id")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("ADMIN", "MANAGER")
    @ApiBearerAuth("access-token")
    @ApiOperation({
        summary: "Delete a service by ID",
        description:
            "This endpoint requires a valid access token. Only users with ADMIN or MANAGER roles are authorized to perform this operation."
    })
    @ApiParam({
        name: "id",
        description: "ID of the service to delete",
        type: String,
        required: true
    })
    @ApiResponse({ status: 200, description: "Service deleted successfully." })
    @ApiResponse({ status: 404, description: "Service not found." })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    remove(@Param("id") id: string) {
        return this.servicesService.remove(+id);
    }
}
