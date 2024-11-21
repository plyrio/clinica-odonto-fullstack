import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, CreateEmployeeZodDto, UpdateEmployeeDto, UpdateEmployeeZodDto } from '@odonto/core';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  
  @Post()
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiResponse({ status: 201, description: 'Employee created successfully.', type: CreateEmployeeZodDto })
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({ type: CreateEmployeeZodDto })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of employeers' })
  @ApiResponse({ status: 200, description: 'Employees retrieved successfully.', type: [CreateEmployeeZodDto] })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiResponse({ status: 503, description: 'Service unavailable.' })
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a employee by ID' })
  @ApiParam({ name: 'id', description: 'ID of the employee to retrieve', type: String })
  @ApiResponse({ status: 200, description: 'Employee found successfully.', type: CreateEmployeeZodDto })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  
  @Patch(':id')
  @ApiOperation({ summary: 'Update a employee by ID' })
  @ApiParam({ name: 'id', description: 'ID of the employee to update', type: String })
  @ApiResponse({ status: 200, description: 'Employee updated successfully.', type: UpdateEmployeeZodDto})
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({ type: UpdateEmployeeZodDto })
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a employee by ID' })
  @ApiParam({ name: 'id', description: 'ID of the employee to delete', type: String })
  @ApiResponse({ status: 200, description: 'Employee deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiResponse({ status: 503, description: 'Service unavailable.' })
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
