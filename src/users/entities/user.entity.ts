import { RdbEntity } from '../../common/entities/rdb.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
  ApiUser = 'ApiUser',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends RdbEntity {
  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ select: false })
  @Field(() => String, { nullable: true })
  password: string;

  @Column({ default: UserRole.User })
  @Field(() => UserRole)
  role: UserRole;

  @Column({ nullable: true })
  @Field(() => String)
  loginSession?: string;

  @BeforeInsert()
  @BeforeUpdate()
  public async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  public async checkPassword(aPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(aPassword, this.password);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
