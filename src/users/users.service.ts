import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FindUserOutput } from './dtos/find-user.dto';
import {
  FindUserSessionInput,
  FindUserSessionOutput,
} from './dtos/find-user-session.dto';
import { JwtService } from '../jwt/jwt.service';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findOne(userId: number): Promise<FindUserOutput> {
    try {
      const user = await this.users.findOneOrFail(userId);
      return {
        ok: true,
        user,
      };
    } catch (e) {
      return { ok: false, error: 'Could not find user.' };
    }
  }

  async findByLoginSession({
    email,
    loginSession,
  }: FindUserSessionInput): Promise<FindUserSessionOutput> {
    try {
      const user: User = await this.users.findOneOrFail({
        email,
        loginSession,
      });
      if (user) {
        return { ok: true, user };
      }
    } catch (error) {
      return { ok: false, error: 'User not found' };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user: User = await this.users.findOne(
        { email },
        { select: ['password', 'id', 'name'] },
      );
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      if (!password) {
        return {
          ok: false,
          error: "You can't do that",
        };
      }
      const passwordCorrect: boolean = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }
      const loginSession: string = '_________session_id';
      await this.users.save({
        id: user.id,
        loginSession,
      });
      const token: string = this.jwtService.sign(email, loginSession);
      return {
        ok: true,
        token,
        name: user.name,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not logged in',
      };
    }
  }

  async create({
    email,
    password,
    name,
    role,
  }: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const exists: User = await this.users.findOne({ email });
      if (exists) {
        return {
          ok: false,
          error: 'There is a user with that email already',
        };
      }
      const user = await this.users.save(
        this.users.create({
          email,
          password,
          role,
          name,
        }),
      );
      return { ok: true, newId: user.id };
    } catch (error) {
      return { ok: false, error: 'Could not create account' };
    }
  }
}
