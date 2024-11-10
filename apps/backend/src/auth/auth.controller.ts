import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SignInResponseZodDro, SignInZodDto } from '@odonto/core';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    
    @HttpCode(HttpStatus.OK)
    @ApiBody({type: SignInZodDto})
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }
}
