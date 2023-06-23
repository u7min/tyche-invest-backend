import { RdbEntity } from '../../common/entities/rdb.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Category extends RdbEntity {
  @Column()
  @Field(() => String)
  name: string;

  @Column({ nullable: true })
  @Field(() => Number, { nullable: true })
  parentId?: number;
}
