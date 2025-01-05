import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request
} from "@nestjs/common";
import { AppointmentsService } from "./appointments.service";
import { GetOccupiedHoursService } from "./get-occuped-hours.service";
import {
    CreateAppointmentDto,
    UpdateAppointmentDto,
    CreateAppointmentZodDto,
    ResponseAppointmentZodDto,
    UpdateAppointmentZodDto
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
import { UserGuard } from "../auth/user.guard";
import { Roles } from "../auth/roles.decorator";

@UseGuards(AuthGuard)
@ApiBearerAuth("access-token")
@ApiTags("Appointments")
@Controller("appointments")
export class AppointmentsController {
    constructor(
        private readonly appointmentsService: AppointmentsService,
        private readonly getOccupiedHoursService: GetOccupiedHoursService
    ) {}

    @Post()
    @ApiOperation({
        summary: "Create a new appointment",
        description:
            "Allows creation of a new appointment with the provided data. This endpoint requires a valid access token."
    })
    @ApiResponse({
        status: 201,
        description: "Appointment created successfully.",
        type: ResponseAppointmentZodDto
    })
    @ApiResponse({ status: 400, description: "Invalid data provided." })
    @ApiResponse({
        status: 403,
        description: "Forbidden. Insufficient permissions."
    })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    @ApiBody({ type: CreateAppointmentZodDto })
    create(@Body() createAppointmentDto: CreateAppointmentDto) {
        return this.appointmentsService.create(createAppointmentDto);
    }

    @Get()
    @ApiOperation({
        summary: "Retrieve a list of appointments",
        description:
            "Fetches a list of all registered appointments. This endpoint requires a valid access token."
    })
    @ApiResponse({
        status: 200,
        description: "Appointments retrieved successfully.",
        type: [ResponseAppointmentZodDto]
    })
    @ApiResponse({
        status: 403,
        description: "Forbidden. Insufficient permissions."
    })
    @ApiResponse({ status: 404, description: "Appointments not found." })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    findAll() {
        return this.appointmentsService.findAll();
    }

    @Get(":id")
    @ApiOperation({
        summary: "Retrieve an appointment by ID",
        description:
            "Fetch the details of a specific appointment by its unique ID. This endpoint requires a valid access token."
    })
    @ApiParam({
        name: "id",
        description: "ID of the appointment to retrieve",
        type: String,
        required: true
    })
    @ApiResponse({
        status: 200,
        description: "Appointment found successfully.",
        type: ResponseAppointmentZodDto
    })
    @ApiResponse({
        status: 403,
        description: "Forbidden. Insufficient permissions."
    })
    @ApiResponse({ status: 404, description: "Appointment not found." })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    findOne(@Param("id") id: string) {
        return this.appointmentsService.findOne(+id);
    }

    @Patch(":id")
    @ApiOperation({
        summary: "Update an appointment by ID",
        description: "This endpoint requires a valid access token."
    })
    @ApiParam({
        name: "id",
        description: "The unique identifier of the appointment to update.",
        type: String,
        required: true
    })
    @ApiResponse({
        status: 200,
        description: "Appointment updated successfully.",
        type: ResponseAppointmentZodDto
    })
    @ApiResponse({ status: 400, description: "Invalid data provided." })
    @ApiResponse({
        status: 403,
        description: "Forbidden. Insufficient permissions."
    })
    @ApiResponse({ status: 404, description: "Appointment not found." })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    @ApiBody({ type: UpdateAppointmentZodDto })
    update(
        @Param("id") id: string,
        @Body() updateAppointmentDto: UpdateAppointmentDto
    ) {
        return this.appointmentsService.update(+id, updateAppointmentDto);
    }

    @Delete(":id")
    @ApiOperation({ summary: "Delete an appointment by ID" })
    @ApiParam({
        name: "id",
        description: "ID of the appointment to delete",
        type: String,
        required: true
    })
    @ApiResponse({
        status: 200,
        description: "Appointment deleted successfully."
    })
    @ApiResponse({
        status: 403,
        description: "Forbidden. Insufficient permissions."
    })
    @ApiResponse({ status: 404, description: "Appointment not found." })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    remove(@Param("id") id: string) {
        return this.appointmentsService.remove(+id);
    }

    @Get(":employee/:date")
    @ApiOperation({
        summary: "Retrieve appointments by employee and date",
        description:
            "Fetch appointments for a specific employee on a specific date."
    })
    @ApiParam({
        name: "employee",
        description: "ID of the employee",
        type: String,
        required: true
    })
    @ApiParam({
        name: "date",
        description: "Date of the appointments",
        type: String,
        required: true
    })
    @ApiResponse({
        status: 200,
        description: "Appointments found successfully.",
        type: [ResponseAppointmentZodDto]
    })
    @ApiResponse({
        status: 404,
        description: "No appointments found for the specified employee and date."
    })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    findByEmployeeAndDate(
        @Param("employee") employee: string,
        @Param("date") dateParam: string
    ) {
        return this.appointmentsService.findByEmployeeAndDate(
            +employee,
            new Date(dateParam)
        );
    }

    @Get("occupiedDate/:employee/:date")
    @ApiOperation({
        summary: "Retrieve occupied hours for an employee on a specific date",
        description:
            "Fetch the hours that are already occupied for a specific employee on a given date."
    })
    @ApiParam({
        name: "employee",
        description: "ID of the employee",
        type: String,
        required: true
    })
    @ApiParam({
        name: "date",
        description: "Date to check for occupied hours",
        type: String,
        required: true
    })
    @ApiResponse({
        status: 200,
        description: "Occupied hours retrieved successfully.",
        type: [String]
    })
    @ApiResponse({
        status: 404,
        description: "No occupied hours found for the specified date."
    })
    @ApiResponse({ status: 500, description: "Internal server error." })
    @ApiResponse({ status: 503, description: "Service unavailable." })
    occupiedDate(
        @Param("employee") employee: string,
        @Param("date") dateParam: string
    ) {
        return this.getOccupiedHoursService.execute(
            +employee,
            new Date(dateParam)
        );
    }
}