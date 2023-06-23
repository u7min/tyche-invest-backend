import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Account } from '../entities/account.entity';
import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreateAccountInput extends PickType(Account, [
  'name',
  'accountNumber',
  'allocRate',
]) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {
  @Field(() => Number, { nullable: true })
  newId?: number;
}
