import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  PickType,
} from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from '../../common/dtos/pagination.dto';
import { IncomeAlloc } from '../entities/income-alloc.entity';

@InputType()
export class AllIncomeAllocsInput extends IntersectionType(
  PaginationInput,
  PickType(IncomeAlloc, ['yearMonth']),
) {}

@ObjectType()
export class AllIncomeAllocsOutput extends PaginationOutput {
  @Field(() => [IncomeAlloc], { nullable: true })
  incomeAllocs?: IncomeAlloc[];
}
