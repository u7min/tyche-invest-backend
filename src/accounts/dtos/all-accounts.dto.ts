import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Account } from '../entities/account.entity';
import {
  PaginationInput,
  PaginationOutput,
} from '../../common/dtos/pagination.dto';

@InputType()
export class AllAccountsInput extends PaginationInput {}

@ObjectType()
export class AllAccountsOutput extends PaginationOutput {
  @Field(() => [Account], { nullable: true })
  accounts?: Account[];
}
