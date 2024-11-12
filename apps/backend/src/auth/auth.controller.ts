import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    UnauthorizedException,
    Res,
    Req,
    Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { SignInZodDto } from '@odonto/core';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: SignInZodDto })
    @Post('login')
    async signIn(
        @Body() signInDto: Record<string, any>,
        @Res({ passthrough: true }) response: Response,
    ) {
        const { access_token, refresh_token } = await this.authService.signIn(
            signInDto.email,
            signInDto.password,
        );

        // Define os tokens como cookies HttpOnly
        response.cookie('accessToken', access_token, {
            httpOnly: true,
            secure: false, // use true se estiver em produção com HTTPS
            maxAge: 15 * 60 * 1000, // 15 minutos
        });
        response.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            secure: false, // use true se estiver em produção com HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 dia
        });

        return { message: 'Login successful' };
    }

    @ApiBearerAuth('access-token')
    @Get('profile')
    async getProfile(@Req() request: Request) {
        const accessToken = request.cookies['accessToken'];

        if (!accessToken) {
            throw new UnauthorizedException('Access token is required');
        }

        const user = await this.authService.validateAccessToken(accessToken);

        if (!user) {
            throw new UnauthorizedException('Invalid access token');
        }

        return { profile: user };
    }

    @Post('refresh')
    async refreshAccessToken(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        const refreshToken = request.cookies['refreshToken'];

        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is required');
        }

        const { access_token } = await this.authService.refreshAccessToken(refreshToken);

        response.cookie('accessToken', access_token, {
            httpOnly: true,
            secure: false,
            maxAge: 15 * 60 * 1000, 
        });

        return { message: 'Access token refreshed' };
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('accessToken');
        response.clearCookie('refreshToken');
        return { message: 'Logged out successfully' };
    }
}