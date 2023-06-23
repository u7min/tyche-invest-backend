import { RdbEntity } from '../../common/entities/rdb.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Account } from '../../accounts/entities/account.entity';

import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';

export enum CurrencyType {
  KRW = 'KRW',
  USD = 'USD',
}

registerEnumType(CurrencyType, { name: 'CurrencyType' });

@InputType('AssetInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Asset extends RdbEntity {
  @Column()
  @Field(() => String)
  name: string;

  @Column({ nullable: true })
  @RelationId((asset: Asset) => asset.account)
  @Field(() => Number, { nullable: true })
  accountId?: number;

  @ManyToOne(() => Account, { onDelete: 'SET NULL' })
  @Field(() => Account)
  account?: Account;

  @Column()
  @RelationId((account: Account) => account.creator)
  @Field(() => Number)
  creatorId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @Field(() => User)
  creator: User;

  @Column({ nullable: true })
  @RelationId((asset: Asset) => asset.category)
  @Field(() => Number, { nullable: true })
  categoryId?: number;

  @ManyToOne(() => Category, { onDelete: 'SET NULL' })
  @Field(() => Category, { nullable: true })
  category?: Category;

  @Column({ nullable: true })
  @RelationId((asset: Asset) => asset.category)
  @Field(() => Number, { nullable: true })
  subCategoryId?: number;

  @ManyToOne(() => Category, { onDelete: 'SET NULL' })
  @Field(() => Category, { nullable: true })
  subCategory?: Category;

  @Column({ default: 0 })
  @Field(() => Number)
  amount: number; //수량

  @Column({ default: CurrencyType.KRW })
  @Field(() => CurrencyType)
  currencyType: CurrencyType; //통화

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  tags?: string;
}
