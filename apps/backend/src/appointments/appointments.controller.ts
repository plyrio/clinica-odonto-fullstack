import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from "@nestjs/common";
import {AppointmentsService} from "./appointments.service";
import {GetOccupiedHoursService} from "./get-occuped-hours.service";
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
  ApiParam
} from "@nestjs/swagger";

@ApiTags("Appointments")
@Controller("appointments")
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly getOccupiedHoursService: GetOccupiedHoursService
  ) {}

  @Post()
  @ApiOperation({summary: "Create a new appointment"})
  @ApiResponse({
    status: 201,
    description: "Appointment created successfully.",
    type: ResponseAppointmentZodDto
  })
  @ApiResponse({status: 400, description: "Invalid data provided."})
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiBody({type: CreateAppointmentZodDto})
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({summary: "Retrieve a list of appointments"})
  @ApiResponse({
    status: 200,
    description: "Appointments retrieved successfully.",
    type: [ResponseAppointmentZodDto]
  })
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiResponse({status: 503, description: "Service unavailable."})
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(":id")
  @ApiOperation({summary: "Retrieve a appointment by ID"})
  @ApiParam({
    name: "id",
    description: "ID of the appointment to retrieve",
    type: String
  })
  @ApiResponse({
    status: 200,
    description: "Appointmenrt found successfully.",
    type: ResponseAppointmentZodDto
  })
  @ApiResponse({status: 404, description: "Appointment not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  findOne(@Param("id") id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({summary: "Update a appointment by ID"})
  @ApiParam({
    name: "id",
    description: "ID of the appointment to update",
    type: String
  })
  @ApiResponse({
    status: 200,
    description: "Appointmenr updated successfully.",
    type: ResponseAppointmentZodDto
  })
  @ApiResponse({status: 400, description: "Invalid data provided."})
  @ApiResponse({status: 404, description: "Appointment not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiBody({type: UpdateAppointmentZodDto})
  update(
    @Param("id") id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(":id")
  @ApiOperation({summary: "Delete a appointment by ID"})
  @ApiParam({
    name: "id",
    description: "ID of the appointment to delete",
    type: String
  })
  @ApiResponse({status: 200, description: "Appointment deleted successfully."})
  @ApiResponse({status: 404, description: "Appointment not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiResponse({status: 503, description: "Service unavailable."})
  remove(@Param("id") id: string) {
    return this.appointmentsService.remove(+id);
  }

  @Get(":employee/:date")
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
  occupiedDate(
    @Param("employee") employee: string,
    @Param("date") dateParam: string
  ) {
    return this.getOccupiedHoursService.execute(+employee, new Date(dateParam));
  }
}
