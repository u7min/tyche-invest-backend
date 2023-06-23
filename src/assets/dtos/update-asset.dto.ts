import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Asset } from '../entities/asset.entity';
import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class UpdateAssetInput extends PartialType(
  PickType(Asset, ['name', 'accountId', 'categoryId', 'subCategoryId', 'tags']),
) {
  @Field(() => Number)
  assetId: number;
}

@ObjectType()
export class UpdateAssetOutput extends CoreOutput {
  @Field(() => Asset, { nullable: true })
  asset?: Asset;
}
