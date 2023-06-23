import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class DeleteAssetInput {
  @Field(() => Number)
  assetId: number;
}

@ObjectType()
export class DeleteAssetOutput extends CoreOutput {}
