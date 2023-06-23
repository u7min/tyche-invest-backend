import { RdbEntity } from '../../common/entities/rdb.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

import { Account } from '../../accounts/entities/account.entity';
import { cutTimes } from '../../common/date.utils';

@InputType('IncomeAllocInputType', { isAbstract: true })
@ObjectType()
@Index(['creatorId', 'yearMonth', 'accountId'], { unique: true })
@Entity()
export class IncomeAlloc extends RdbEntity {
  @Column()
  @RelationId((account: Account) => account.creator)
  @Field(() => Number)
  creatorId: number;

  @Column()
  @Field(() => Date)
  yearMonth: Date;

  @Column({ nullable: true })
  @RelationId((incomeAlloc: IncomeAlloc) => incomeAlloc.account)
  @Field(() => Number, { nullable: true })
  accountId?: number;

  @ManyToOne(() => Account, { onDelete: 'SET NULL' })
  @Field(() => Account)
  account?: Account;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @Field(() => User)
  creator: User;

  @Column()
  @Field(() => Number)
  amount: number;

  @Column()
  @Field(() => String)
  accountName: string;

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

  @BeforeInsert()
  cutDayAndTimes() {
    if (this.yearMonth) {
      this.yearMonth = cutTimes(this.yearMonth);
    }
  }
}
