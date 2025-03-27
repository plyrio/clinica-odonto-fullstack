import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  CreateUserZodDto,
  UpdateUserZodDto,
  ResponseUserZodDto,
  UpdatePasswordDto,
  UpdatePasswordZodDto,
  RefreshTokenResponseZodDto,
  RefreshTokenDto,
  RefreshTokenZodDto,
} from '@odonto/core';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { UserGuard } from '../auth/user.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Allows creation of a new user with the provided data.',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    type: ResponseUserZodDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiResponse({ status: 503, description: 'Service unavailable.' })
  @ApiBody({ type: CreateUserZodDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve a list of users',
    description: 'Fetches a list of all registered users.',
  })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully.',
    type: [ResponseUserZodDto],
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiResponse({ status: 503, description: 'Service unavailable.' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a user by ID',
    description:
      'Fetch the details of a specific user by their unique ID. The ID must correspond to an existing user in the database.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user to retrieve.',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'User found successfully.',
    type: ResponseUserZodDto,
  })
  @ApiResponse({
    status: 404,
    description:
      'User not found. The specified ID does not match any existing user.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiResponse({ status: 503, description: 'Service unavailable.' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(UserGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Update a user by ID',
    description:
      "This endpoint requires a valid access token. Only the user themselves or an administrator can perform this operation. The user ID provided in the URL must match the authenticated user's ID unless the requester has administrator privileges.",
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user to update.',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully.',
    type: ResponseUserZodDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Insufficient permissions.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiResponse({ status: 503, description: 'Service unavailable.' })
  @ApiBody({ type: UpdateUserZodDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Delete a user by ID',
    description:
      'This endpoint requires a valid access token. Only users with the roles ADMIN or MANAGER are authorized to perform this operation. The user ID provided in the URL will be used to identify the user to be deleted.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user to delete.',
    type: String,
    required: true,
  })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({
    status: 404,
    description:
      'User not found. The specified ID does not match any existing user.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiResponse({ status: 503, description: 'Service unavailable.' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Patch(':id/password')
  @UseGuards(UserGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Update user password',
    description:
      "This endpoint requires a valid access token. Only the user themselves or an administrator can perform this operation. The user ID provided in the URL must match the authenticated user's ID unless the requester has administrator privileges.",
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user to update.',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Password successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Invalid data or old password.' })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Only the owner of the account or an admin can perform this action.',
  })
  @ApiResponse({
    status: 404,
    description:
      'User not found. The specified ID does not match any existing user.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiResponse({ status: 503, description: 'Service unavailable.' })
  @ApiBody({ type: UpdatePasswordZodDto })
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(+id, updatePasswordDto);
  }
}
