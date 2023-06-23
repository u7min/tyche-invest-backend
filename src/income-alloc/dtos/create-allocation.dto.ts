import { IncomeAlloc } from '../entities/income-alloc.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class AllocationInput extends PickType(IncomeAlloc, ['yearMonth']) {
  @Field(() => Number)
  income: number;
}

@ObjectType()
export class AllocationOutput extends CoreOutput {}
