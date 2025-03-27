import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Injectable()
export class UserGuard extends AuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const baseAuth = await super.canActivate(context);
    if (!baseAuth) {
      //console.log("Nao validou o token no user guard");
      return false;
    }
    //console.log("Validou o token e entrou no userguard");
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userIdFromParams = +request.params.id;
    const isAdmin = user.role.includes('ADMIN');

    /*  console.log(user);
    console.log(userIdFromParams);
    console.log(typeof user.sub);
    console.log(typeof userIdFromParams);
    console.log(user.role);*/
    if (userIdFromParams && userIdFromParams !== user.sub && !isAdmin) {
      // console.log("Falhou a verifica");
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
