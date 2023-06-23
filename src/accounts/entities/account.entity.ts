import { RdbEntity } from '../../common/entities/rdb.entity';
import { User } from '../../users/entities/user.entity';

import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType('AccountInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Account extends RdbEntity {
  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @RelationId((account: Account) => account.creator)
  @Field(() => Number)
  creatorId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE', eager: true })
  @Field(() => User)
  creator: User;

  @Column()
  @Field(() => String)
  accountNumber: string;

  @Field(() => Number, { nullable: true, defaultValue: 1.0 })
  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
    nullable: true,
    default: 1.0,
  })
  allocRate?: number;
}
