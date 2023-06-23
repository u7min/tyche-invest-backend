import { IncomeAlloc } from '../entities/income-alloc.entity';
import { PickType } from '@nestjs/graphql';

// For just internal service
export class CreateIncomeAllocInput extends PickType(IncomeAlloc, [
  'creatorId',
  'yearMonth',
  'accountId',
  'accountName',
  'accountNumber',
  'allocRate',
  'amount',
]) {}
