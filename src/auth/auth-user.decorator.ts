import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';
import {User} from "../users/entities/user.entity";

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const gqlContext: any = GqlExecutionContext.create(context).getContext();
    return gqlContext['user'];
  }
);
