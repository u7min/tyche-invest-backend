import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Asset } from '../entities/asset.entity';
import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreateAssetInput extends PickType(Asset, [
  'name',
  'amount',
  'accountId',
  'categoryId',
  'subCategoryId',
  'tags',
]) {}

@ObjectType()
export class CreateAssetOutput extends CoreOutput {
  @Field(() => Number, { nullable: true })
  newId?: number;
}
