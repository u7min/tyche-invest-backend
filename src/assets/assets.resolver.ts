import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AssetsService } from './assets.service';
import { CreateAssetInput, CreateAssetOutput } from './dtos/create-asset.dto';
import { AuthUser } from '../auth/auth-user.decorator';
import { Role } from '../auth/role.decorator';
import { UpdateAssetInput, UpdateAssetOutput } from './dtos/update-asset.dto';
import { DeleteAssetInput, DeleteAssetOutput } from './dtos/delete-asset.dto';
import { AllAssetsOutput } from './dtos/all-assets.dto';

@Resolver()
export class AssetsResolver {
  constructor(private readonly assetsService: AssetsService) {}

  @Role(['Any'])
  @Mutation(() => CreateAssetOutput)
  createAsset(
    @AuthUser() authUser,
    @Args('input') input: CreateAssetInput,
  ): Promise<CreateAssetOutput> {
    return this.assetsService.create(authUser, input);
  }

  @Role(['Any'])
  @Mutation(() => UpdateAssetOutput)
  updateAsset(
    @AuthUser() authUser,
    @Args('input') input: UpdateAssetInput,
  ): Promise<UpdateAssetOutput> {
    return this.assetsService.update(authUser, input);
  }

  @Role(['Any'])
  @Mutation(() => DeleteAssetOutput)
  deleteAsset(
    @AuthUser() authUser,
    @Args('input') input: DeleteAssetInput,
  ): Promise<DeleteAssetOutput> {
    return this.assetsService.delete(authUser, input);
  }

  @Role(['Any'])
  @Query(() => AllAssetsOutput)
  allAssets(@AuthUser() authUser): Promise<AllAssetsOutput> {
    return this.assetsService.findAll(authUser);
  }
}
