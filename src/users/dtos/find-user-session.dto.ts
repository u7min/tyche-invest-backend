import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreOutput } from '../../common/dtos/output.dto';

@ArgsType()
export class FindUserSessionInput extends PickType(User, [
  'email',
  'loginSession',
]) {}

@ObjectType()
export class FindUserSessionOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
