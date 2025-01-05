import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  Response,
  Request,
  Get,
  UseGuards
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam
} from "@nestjs/swagger";
import { SignInZodDto } from "@odonto/core";
import { AuthGuard } from "./auth.guard";
import { RolesGuard } from "./roles.guard";
import { Roles } from "./roles.decorator";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ApiOperation({
    summary: "Validate credentials and create JWT",
    description: "This endpoint allows users to log in by providing credentials (email and password). If valid, JWT tokens are issued."
  })
  @ApiResponse({
    status: 201,
    description: "User validated and login successful."
  })
  @ApiResponse({ status: 400, description: "Invalid data provided." })
  @ApiResponse({ status: 500, description: "Internal server error." })
  @ApiBody({ type: SignInZodDto })
  async signIn(
    @Body() signInDto: Record<string, any>,
    @Response({ passthrough: true }) res
  ) {
    const { access_token, refresh_token } = await this.authService.signIn(
      signInDto.email,
      signInDto.password
    );

    res.cookie("accessToken", access_token, {
      httpOnly: true,
      secure: false, // dev: false, prod: true (https)
      maxAge: 15 * 60 * 1000
    });
    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    });

    return { message: "Login successful" };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("USER", "EMPLOYEE")
  @ApiBearerAuth("access-token")
  @Get("profile")
  @ApiOperation({
    summary: "Retrieve user profile",
    description: "This endpoint allows logged-in users to fetch their profile information."
  })
  @ApiResponse({
    status: 200,
    description: "Profile retrieved successfully.",
    type: Object // Replace with the actual profile DTO if applicable
  })
  @ApiResponse({ status: 401, description: "Unauthorized. Invalid or expired token." })
  async getProfile(@Request() req) {
    return { profile: req.user };
  }

  @Post("refresh")
  @ApiOperation({
    summary: "Refresh access token",
    description: "This endpoint refreshes the access token using the provided refresh token."
  })
  @ApiResponse({
    status: 200,
    description: "Access token refreshed successfully."
  })
  @ApiResponse({ status: 401, description: "Refresh token is required or invalid." })
  async refreshAccessToken(@Request() req, @Response({ passthrough: true }) res) {
    const refreshToken = req.cookies["refreshToken"];

    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token is required");
    }

    const { access_token } = await this.authService.refreshAccessToken(refreshToken);

    res.cookie("accessToken", access_token, {
      httpOnly: true,
      secure: false,
      maxAge: 15 * 60 * 1000
    });

    return { message: "Access token refreshed" };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth("access-token")
  @Post("logout")
  @ApiOperation({
    summary: "Logout user",
    description: "This endpoint allows users to log out by clearing the authentication cookies."
  })
  @ApiResponse({
    status: 200,
    description: "Logged out successfully."
  })
  @ApiResponse({ status: 401, description: "Unauthorized. Invalid or expired token." })
  async logout(@Response({ passthrough: true }) res) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return { message: "Logged out successfully" };
  }
}