import {Field, ObjectType} from '@nestjs/graphql';
import {CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn,} from 'typeorm';

@ObjectType()
export class RdbEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field(() => Date)
  @CreateDateColumn()
  public createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  public updatedAt: Date;
}
