import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "src/user/user.module";
import {jwtConstants} from "./constants";
import {CommonModule} from "../common/common.module";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret
    }),
    CommonModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
