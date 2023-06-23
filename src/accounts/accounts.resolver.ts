import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccountsService } from './accounts.service';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import {
  UpdateAccountInput,
  UpdateAccountOutput,
} from './dtos/update-account.dto';
import {
  DeleteAccountInput,
  DeleteAccountOutput,
} from './dtos/delete-account.dto';
import { FindAccountInput, FindAccountOutput } from './dtos/find-account.dto';
import { AllAccountsInput, AllAccountsOutput } from './dtos/all-accounts.dto';
import { AuthUser } from '../auth/auth-user.decorator';
import { Role } from '../auth/role.decorator';

@Resolver()
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @Role(['Any'])
  @Mutation(() => CreateAccountOutput)
  createAccount(
    @AuthUser() authUser,
    @Args('input') input: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.accountsService.create(authUser, input);
  }

  @Role(['Any'])
  @Mutation(() => UpdateAccountOutput)
  updateAccount(
    @AuthUser() authUser,
    @Args('input') input: UpdateAccountInput,
  ): Promise<UpdateAccountOutput> {
    return this.accountsService.update(authUser, input);
  }

  @Role(['Any'])
  @Mutation(() => DeleteAccountOutput)
  deleteAccount(
    @AuthUser() authUser,
    @Args() { accountId }: DeleteAccountInput,
  ): Promise<DeleteAccountOutput> {
    return this.accountsService.delete(authUser, accountId);
  }

  @Role(['Any'])
  @Query(() => FindAccountOutput)
  findAccount(
    @AuthUser() authUser,
    @Args() { accountId }: FindAccountInput,
  ): Promise<FindAccountOutput> {
    return this.accountsService.findOne(authUser, accountId);
  }

  @Role(['Any'])
  @Query(() => AllAccountsOutput)
  findAllAccounts(
    @AuthUser() authUser,
    @Args('input') {}: AllAccountsInput,
  ): Promise<AllAccountsOutput> {
    return this.accountsService.findAll(authUser);
  }
}
