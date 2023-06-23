import { CoreOutput } from '../../common/dtos/output.dto';
import { Category } from '../entities/category.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class AllCategoriesInput extends PickType(Category, ['parentId']) {}

@ObjectType()
export class AllCategoriesOutput extends CoreOutput {
  @Field(() => [Category], { nullable: true })
  categories?: Category[];
}
