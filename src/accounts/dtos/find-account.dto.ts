import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Account } from '../entities/account.entity';

@ArgsType()
export class FindAccountInput {
  @Field(() => Number)
  accountId: number;
}

@ObjectType()
export class FindAccountOutput extends CoreOutput {
  @Field(() => Account, { nullable: true })
  account?: Account;
}
