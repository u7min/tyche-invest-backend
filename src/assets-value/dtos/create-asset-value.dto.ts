import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { AssetValue } from '../entities/asset-value.entity';
import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreateAssetValueInput extends PickType(AssetValue, [
  'yearMonth',
]) {}

@ObjectType()
export class CreateAssetValueOutput extends CoreOutput {
  @Field(() => Number, { nullable: true })
  newId?: number;
}
