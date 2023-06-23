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

import { Account } from '../../accounts/entities/account.entity';
import { User } from '../../users/entities/user.entity';
import { Asset } from '../../assets/entities/asset.entity';
import { cutTimes } from '../../common/date.utils';

@InputType('AssetValueInputType', { isAbstract: true })
@ObjectType()
@Index(['creatorId', 'yearMonth', 'assetId'], { unique: true })
@Entity()
export class AssetValue extends RdbEntity {
  @Column()
  @RelationId((account: Account) => account.creator)
  @Field(() => Number)
  creatorId: number;

  @Column()
  @Field(() => Date)
  yearMonth: Date;

  @Column({ nullable: true })
  @RelationId((assetValue: AssetValue) => assetValue.asset)
  @Field(() => Number, { nullable: true })
  assetId?: number;

  @ManyToOne(() => Asset, { onDelete: 'SET NULL' })
  @Field(() => Asset, { nullable: true })
  asset?: Asset;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @Field(() => User)
  creator: User;

  @Column({ default: 1 })
  @Field(() => Number)
  exchangeRate: number; //평가 당시 환율

  @Column({ default: 0 })
  @Field(() => Number)
  value: number; //평가 당시 금액

  @Column({ default: 0 })
  @Field(() => Number, { nullable: true })
  askAvg?: number; //매수가 평균

  @Column({ default: 0 })
  @Field(() => Number, { nullable: true })
  perform?: number; //수익률

  @BeforeInsert()
  cutDayAndTimes() {
    if (this.yearMonth) {
      this.yearMonth = cutTimes(this.yearMonth);
    }
  }
}
