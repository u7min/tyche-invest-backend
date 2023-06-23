import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class CoreOutput {
  @Field(() => String, { nullable: true })
  public error?: string;

  @Field(() => Boolean)
  public ok: boolean;
}
