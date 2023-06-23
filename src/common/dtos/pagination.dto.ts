import {Field, InputType, Int, ObjectType} from '@nestjs/graphql';
import {CoreOutput} from './output.dto';

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true })
  public page?: number;
}

@ObjectType()
export class PaginationOutput extends CoreOutput {
  @Field(() => Int, { nullable: true })
  public totalPages?: number;

  @Field(() => Int, { nullable: true })
  public totalResults?: number;
}
