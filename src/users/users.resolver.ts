import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { AuthUser } from '../auth/auth-user.decorator';
import { Role } from '../auth/role.decorator';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { FindUserOutput } from './dtos/find-user.dto';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => LoginOutput)
  login(@Args('input') input: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(input);
  }

  @Role(['Any'])
  @Query(() => FindUserOutput)
  me(@AuthUser() authUser: User) {
    return this.usersService.findOne(authUser.id);
  }

  @Mutation(() => CreateUserOutput)
  createUser(@Args('input') input: CreateUserInput): Promise<CreateUserOutput> {
    return this.usersService.create(input);
  }
}
