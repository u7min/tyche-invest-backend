import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Asset } from '../entities/asset.entity';
import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class FindAssetInput {
  @Field(() => Number)
  assetId: number;
}

@ObjectType()
export class FindAssetOutput extends CoreOutput {
  @Field(() => Asset, { nullable: true })
  asset?: Asset;
}
