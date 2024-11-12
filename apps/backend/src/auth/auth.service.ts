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
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string, refresh_token: string }> {
    try {
      const user = await this.userService.findByEmail(email);
      const passwordMatch = await bcrypt.compare(pass, user.password);
      if (!passwordMatch) {
        throw new UnauthorizedException();
      }

      const payload = { sub: user.id, email: user.email};
  
      const access_token = await this.jwtService.signAsync(payload, { expiresIn: '15m'});

    
      const refresh_token = await this.jwtService.signAsync(payload, { expiresIn: '1d' });

      try {
         await this.userService.updateRefreshToken(user.id, { refreshToken: refresh_token });

      } catch (error: unknown) {
         this.commonService.handleError(error, `Failed to save refreshtoken for user ${user.id}`)
      }
    
      return {
        access_token,
        refresh_token,
      };
    } catch (error) {
      this.commonService.handleError(error, `Failed to signIn`);
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<{ access_token: string }> {
    try {
      
      const decoded = await this.jwtService.verifyAsync(refreshToken);

      const user = await this.userService.findByIdRefreshToken(decoded.sub);

      
      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

    
      const payload = { sub: user.id, email: user.email };
      const access_token = await this.jwtService.signAsync(payload, { expiresIn: '15m' });

      return {
        access_token,
      };
    
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
}
  }
