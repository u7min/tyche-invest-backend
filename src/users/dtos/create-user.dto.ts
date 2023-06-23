import { User } from '../entities/user.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreateUserInput extends PickType(User, [
  'email',
  'name',
  'password',
  'role',
]) {}

@ObjectType()
export class CreateUserOutput extends CoreOutput {
  @Field(() => Number, { nullable: true })
  public newId?: number;
}
