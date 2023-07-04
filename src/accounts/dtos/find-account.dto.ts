import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Account } from '../entities/account.entity';

@ArgsType()
export class AccountInput {
  @Field(() => Number)
  accountId: number;
}

@ObjectType()
export class AccountOutput extends CoreOutput {
  @Field(() => Account, { nullable: true })
  account?: Account;
}
