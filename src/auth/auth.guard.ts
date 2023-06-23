import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { JwtService } from '../jwt/jwt.service';
import { AllowedRoles } from './role.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: AllowedRoles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }

    const gqlContext: any = GqlExecutionContext.create(context).getContext();
    const token: boolean = gqlContext.token;

    if (token) {
      const decoded: any = this.jwtService.verify(token.toString());
      if (
        typeof decoded === 'object' &&
        decoded.hasOwnProperty('email') &&
        decoded.hasOwnProperty('loginSession')
      ) {
        const { user } = await this.userService.findByLoginSession({
          email: decoded['email'],
          loginSession: decoded['loginSession'],
        });

        if (!user) {
          return false;
        }

        gqlContext['user'] = user;

        if (roles.includes('Any')) {
          return true;
        }

        return roles.includes(user.role);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
