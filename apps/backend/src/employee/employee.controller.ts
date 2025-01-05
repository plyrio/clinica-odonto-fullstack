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
import { EmployeeService } from "./employee.service";
import {
    CreateEmployeeDto,
    CreateEmployeeZodDto,
    UpdateEmployeeDto,
    UpdateEmployeeRoleDto,
    UpdateEmployeeZodDto,
    UpdateEmployeeRoleZodDto,
    ResponseEmployeeDto,
    ResponseEmployeeZodDto
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

@ApiTags("employee")
@Controller("employee")
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("ADMIN", "MANAGER")
    @ApiBearerAuth("access-token")
    @ApiOperation({
        summary: "Create a new employee",
        description:
            "Allows creation of a new employee with the provided data. This endpoint requires a valid access token."
    })
    @ApiResponse({
        status: 201,
        description: "Employee created successfully.",
        type: CreateEmployeeZodDto
    })
    @ApiResponse({ status: 400, description: "Invalid data provided." })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    @ApiBody({ type: CreateEmployeeZodDto })
    create(@Body() createEmployeeDto: CreateEmployeeDto) {
        return this.employeeService.create(createEmployeeDto);
    }

    @Get()
    @ApiOperation({
        summary: "Retrieve a list of employeers",
        description: "Fetches a list of all registered employeers."
    })
    @ApiResponse({
        status: 200,
        description: "Employees retrieved successfully.",
        type: [ResponseEmployeeZodDto]
    })
    @ApiResponse({ status: 400, description: "Invalid data provided." })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    findAll() {
        return this.employeeService.findAll();
    }

    @Get(":id")
    @ApiOperation({
        summary: "Retrieve a employee by ID",
        description:
            "Fetch the details of a specific employee by their unique ID. The ID must correspond to an existing employee in the database."
    })
    @ApiParam({
        name: "id",
        description: "The unique identifier of the employee to retrieve.",
        type: String,
        required: true
    })
    @ApiResponse({
        status: 200,
        description: "Employee found successfully.",
        type: ResponseEmployeeZodDto
    })
    @ApiResponse({ status: 404, description: "Employee not found." })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    findOne(@Param("id") id: string) {
        return this.employeeService.findOne(+id);
    }

    @Patch(":id")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("ADMIN", "MANAGER")
    @ApiBearerAuth("access-token")
    @ApiOperation({
        summary: "Update a employee by ID",
        description:
            "This endpoint requires a valid access token. Only the administrator or an manager can perform this operation. The ID must correspond to an existing employee in the database."
    })
    @ApiParam({
        name: "id",
        description: "The unique identifier of the employee to update.",
        type: String,
        required: true
    })
    @ApiResponse({
        status: 200,
        description: "Employee updated successfully.",
        type: UpdateEmployeeZodDto
    })
    @ApiResponse({ status: 400, description: "Invalid data provided." })
    @ApiResponse({
        status: 403,
        description: "Forbidden. Insufficient permissions."
    })
    @ApiResponse({ status: 404, description: "Employee not found." })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    @ApiBody({ type: UpdateEmployeeZodDto })
    update(
        @Param("id") id: string,
        @Body() updateEmployeeDto: UpdateEmployeeDto
    ) {
        return this.employeeService.update(+id, updateEmployeeDto);
    }
    @Patch("employee-role/:id")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("ADMIN", "MANAGER")
    @ApiBearerAuth("access-token")
    @ApiOperation({
        summary: "Update role of a employee by ID",
        description:
            "This endpoint requires a valid access token. Only the administrator or an manager can perform this operation. The ID must correspond to an existing employee in the database."
    })
    @ApiParam({
        name: "id",
        description: "The unique identifier of the employee to update role.",
        type: String,
        required: true
    })
    @ApiResponse({
        status: 200,
        description: "Employee role updated successfully.",
        type: ResponseEmployeeZodDto
    })
    @ApiResponse({ status: 400, description: "Invalid data provided." })
    @ApiResponse({ status: 404, description: "Employee not found." })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    @ApiBody({ type: UpdateEmployeeRoleZodDto })
    updateRole(
        @Param("id") id: string,
        @Body() updateEmployeeRoleDto: UpdateEmployeeRoleDto
    ) {
        return this.employeeService.updateRole(+id, updateEmployeeRoleDto);
    }

    @Delete(":id")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("ADMIN", "MANAGER")
    @ApiBearerAuth("access-token")
    @ApiOperation({ summary: "Delete a employee by ID" })
    @ApiParam({
        name: "id",
        description: "The unique identifier of the employee to delete.",
        type: String,
        required: true
    })
    @ApiResponse({ status: 200, description: "Employee deleted successfully." })
    @ApiResponse({ status: 404, description: "Employee not found." })
    @ApiResponse({
        status: 403,
        description: "Forbidden. Insufficient permissions."
    })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    remove(@Param("id") id: string) {
        return this.employeeService.remove(+id);
    }
}
