import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecialitiesService } from './specialties.service';
import { UpdateSpecialityDto, CreateSpecialityDto, UpdateSpecialityZodDto, CreateSpecialityZodDto } from '@odonto/core';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('specialities')
@Controller('specialities')
export class SpecialitiesController {
  constructor(private readonly specialitiesService: SpecialitiesService) { }

  @ApiOperation({summary: 'Create a new specialty.'})
  @ApiResponse({status: 201, description: 'Specialty successfully created'})
  @ApiResponse({status: 400, description: 'Invalid data.'})
  @ApiBody({ type: CreateSpecialityZodDto })
  @Post()
  create(@Body() createSpecialityDto: CreateSpecialityDto) {
    return this.specialitiesService.create(createSpecialityDto);
  }

  @ApiOperation({summary: 'Return all specialty.'})
  @ApiResponse({status: 200, description: 'Users listed successfully.' })
  @Get()
  findAll() {
    return this.specialitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialitiesService.findOne(+id);
  }

  @ApiBody({ type: UpdateSpecialityZodDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecialityDto: UpdateSpecialityDto) {
    return this.specialitiesService.update(+id, updateSpecialityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialitiesService.remove(+id);
  }
}
