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
import {UserService} from "./user.service";
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
  RefreshTokenZodDto
} from "@odonto/core";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam
} from "@nestjs/swagger";
import {AuthGuard} from "../auth/auth.guard";
import {Roles} from "../auth/roles.decorator";

@ApiTags("Users")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({summary: "Create a new user"})
  @ApiResponse({
    status: 201,
    description: "User created successfully.",
    type: ResponseUserZodDto
  })
  @ApiResponse({status: 400, description: "Invalid data provided."})
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiBody({type: CreateUserZodDto})
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @UseGuards(AuthGuard)
  // @Roles("ADMIN")
  @Get()
  @ApiOperation({summary: "Retrieve a list of users"})
  @ApiResponse({
    status: 200,
    description: "Users retrieved successfully.",
    type: [ResponseUserZodDto]
  })
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiResponse({status: 503, description: "Service unavailable."})
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOperation({summary: "Retrieve a user by ID"})
  @ApiParam({
    name: "id",
    description: "ID of the user to retrieve",
    type: String
  })
  @ApiResponse({
    status: 200,
    description: "User found successfully.",
    type: ResponseUserZodDto
  })
  @ApiResponse({status: 404, description: "User not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({summary: "Update a user by ID"})
  @ApiParam({name: "id", description: "ID of the user to update", type: String})
  @ApiResponse({
    status: 200,
    description: "User updated successfully.",
    type: ResponseUserZodDto
  })
  @ApiResponse({status: 400, description: "Invalid data provided."})
  @ApiResponse({status: 404, description: "User not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiBody({type: UpdateUserZodDto})
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Patch(":id/refreshToken")
  @ApiOperation({summary: "Update  refresh_token of a user by ID"})
  @ApiParam({name: "id", description: "ID of the user to update refresh_token", type: String})
  @ApiResponse({
    status: 200,
    description: "User refresh_token updated successfully.",
    type: RefreshTokenResponseZodDto
  })
  @ApiResponse({status: 400, description: "Invalid data provided."})
  @ApiResponse({status: 404, description: "User not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiBody({type: RefreshTokenZodDto})
  updateRefreshToken(
    @Param("id") id: string,
    @Body() updateRefreshTokenDto: RefreshTokenDto
  ) {
    return this.userService.updateRefreshToken(+id, updateRefreshTokenDto);
  }

  @Delete(":id")
  @ApiOperation({summary: "Delete a user by ID"})
  @ApiParam({name: "id", description: "ID of the user to delete", type: String})
  @ApiResponse({status: 200, description: "User deleted successfully."})
  @ApiResponse({status: 404, description: "User not found."})
  @ApiResponse({status: 500, description: "Internal server error."})
  @ApiResponse({status: 503, description: "Service unavailable."})
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }

  @Patch(":id/password")
  @ApiOperation({summary: "Update user password"})
  @ApiResponse({status: 200, description: "Password successfully updated."})
  @ApiResponse({status: 400, description: "Invalid data or old password."})
  @ApiResponse({status: 404, description: "User not found."})
  @ApiBody({type: UpdatePasswordZodDto})
  async updatePassword(
    @Param("id") id: string,
    @Body() updatePasswordDto: UpdatePasswordDto
  ) {
    return this.userService.updatePassword(+id, updatePasswordDto);
  }
}
