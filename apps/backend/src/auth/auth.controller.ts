import { UseGuards, Get, Request,  Body, Controller, Post, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { SignInZodDto, RefreshTokenZodDto, RefreshTokenDto} from '@odonto/core';
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



    @Post('refresh')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('refresh-token')
    async refreshAccessToken( @Request() req) {
        const refreshToken  = req.headers['authorization']?.split(' ')[1];

        
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is required');
        }

        return await this.authService.refreshAccessToken(refreshToken)
    }
    }