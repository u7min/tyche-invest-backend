import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Account } from '../entities/account.entity';
import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class UpdateAccountInput extends PartialType(
  PickType(Account, ['name', 'accountNumber', 'allocRate']),
) {
  @Field(() => Number)
  accountId: number;
}

@ObjectType()
export class UpdateAccountOutput extends CoreOutput {
  @Field(() => Account, { nullable: true })
  account?: Account;
}
