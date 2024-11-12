import { signInResponseSchema } from '@odonto/core';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly commonService: CommonService,
    ){}

    async signIn(email: string, pass: string):Promise<{access_token: string}> {
        try {
            const user = await this.userService.findByEmail(email)
            const passwordMatch = await bcrypt.compare(pass, user.password)

            if(!passwordMatch){
                throw new UnauthorizedException();
            }

            const payload = {sub: user.id, email: user.email }
            

            return {
                access_token: await this.jwtService.signAsync(payload)
            }
        } catch (error) {
            this.commonService.handleError(error, `Failed to signIn`)
        }
    }
}
