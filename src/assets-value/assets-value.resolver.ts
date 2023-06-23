import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AssetsValueService } from './assets-value.service';
import { Role } from '../auth/role.decorator';
import {
  CreateAssetValueInput,
  CreateAssetValueOutput,
} from './dtos/create-asset-value.dto';
import {
  DeleteAssetValuesInput,
  DeleteAssetValuesOutput,
} from './dtos/delete-asset-values.dto';
import {
  AllAssetValuesInput,
  AllAssetValuesOutput,
} from './dtos/all-asset-values.dto';
import { AuthUser } from '../auth/auth-user.decorator';

@Resolver()
export class AssetsValueResolver {
  constructor(private readonly assetsValueService: AssetsValueService) {}

  @Role(['Any'])
  @Mutation(() => CreateAssetValueOutput)
  createAssetValue(
    @AuthUser() authUser,
    @Args('input') input: CreateAssetValueInput,
  ) {
    return this.assetsValueService.create(authUser, input);
  }

  @Role(['Any'])
  @Mutation(() => DeleteAssetValuesOutput)
  deleteAssetValues(
    @AuthUser() authUser,
    @Args('input') input: DeleteAssetValuesInput,
  ) {
    return this.assetsValueService.delete(authUser, input);
  }

  @Role(['Any'])
  @Query(() => AllAssetValuesOutput)
  findAllAssetValues(
    @AuthUser() authUser,
    @Args('input') input: AllAssetValuesInput,
  ) {
    return this.assetsValueService.findAll(authUser, input);
  }
}
