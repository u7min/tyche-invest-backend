import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IncomeAllocService } from './income-alloc.service';
import {
  AllocationInput,
  AllocationOutput,
} from './dtos/create-allocation.dto';
import { AuthUser } from '../auth/auth-user.decorator';
import { Role } from '../auth/role.decorator';
import {
  DeleteIncomeAllocsInput,
  DeleteIncomeAllocsOutput,
} from './dtos/delete-income-allocs.dto';
import {
  AllIncomeAllocsInput,
  AllIncomeAllocsOutput,
} from './dtos/all-income-allocs.dto';

@Resolver()
export class IncomeAllocResolver {
  constructor(private readonly incomeAllocService: IncomeAllocService) {}

  @Role(['Any'])
  @Mutation(() => AllocationOutput)
  createAllocation(
    @AuthUser() authUser,
    @Args('input') input: AllocationInput,
  ): Promise<AllocationOutput> {
    return this.incomeAllocService.create(authUser, input);
  }

  @Role(['Any'])
  @Mutation(() => DeleteIncomeAllocsOutput)
  deleteAllocation(
    @AuthUser() authUser,
    @Args('input') input: DeleteIncomeAllocsInput,
  ): Promise<DeleteIncomeAllocsOutput> {
    return this.incomeAllocService.delete(authUser, input);
  }

  @Role(['Any'])
  @Query(() => AllIncomeAllocsOutput)
  allAllocations(
    @AuthUser() authUser,
    @Args('input') input: AllIncomeAllocsInput,
  ): Promise<AllIncomeAllocsOutput> {
    return this.incomeAllocService.findAll(authUser, input);
  }
}
