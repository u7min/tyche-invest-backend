import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';
import { AssetValue } from '../entities/asset-value.entity';

@InputType()
export class AllAssetValuesInput extends PickType(AssetValue, ['yearMonth']) {}

@ObjectType()
export class AllAssetValuesOutput extends CoreOutput {
  @Field(() => [AssetValue], { nullable: true })
  assetValues?: AssetValue[];
}
