import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PaginationInput } from '../../common/dtos/pagination.dto';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Asset } from '../entities/asset.entity';

@InputType()
export class AllAssetsInput extends PaginationInput {}

@ObjectType()
export class AllAssetsOutput extends CoreOutput {
  @Field(() => [Asset], { nullable: true })
  assets?: Asset[];
}
