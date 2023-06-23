import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';

@ArgsType()
export class DeleteAccountInput {
  @Field(() => Number)
  accountId: number;
}

@ObjectType()
export class DeleteAccountOutput extends CoreOutput {}
