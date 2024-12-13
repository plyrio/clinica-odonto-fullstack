import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException
} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {Request} from "express";
import {Reflector} from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException("Token is missing");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });

      request["user"] = payload;
      if (roles && roles.length > 0) {
        if (!roles.includes(payload.role)) {
          throw new ForbiddenException("Access denied");
        }
      }
      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new UnauthorizedException("Invalid or expired token");
    }

    return true;
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    if (type === "Bearer" && token) {
      return token;
    }

    const cookieToken = request.cookies?.accessToken;
    if (cookieToken) {
      // console.log("Extracted token from cookie:", cookieToken);
      return cookieToken;
    }

    return undefined;
  }
}
