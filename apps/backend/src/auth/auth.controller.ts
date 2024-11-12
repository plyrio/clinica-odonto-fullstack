import { UseGuards, Get, Request,  Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { SignInZodDto, RefreshTokenZodDto } from '@odonto/core';
import { AuthGuard } from './auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: SignInZodDto })
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }


    @ApiBearerAuth('refresh-token')
    @ApiBody({ type: RefreshTokenZodDto })
    @Post('refresh')
  async refreshAccessToken(@Body() body: { refresh_token: string }) {
    const { refresh_token } = body;
      return await this.authService.refreshAccessToken(refresh_token);
    
  }
}
