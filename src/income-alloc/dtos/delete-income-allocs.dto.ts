import { IncomeAlloc } from '../entities/income-alloc.entity';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class DeleteIncomeAllocsInput extends PickType(IncomeAlloc, [
  'yearMonth',
]) {}

@ObjectType()
export class DeleteIncomeAllocsOutput extends CoreOutput {}
