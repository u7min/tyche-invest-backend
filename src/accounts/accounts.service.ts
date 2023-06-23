import { Injectable } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import {
  UpdateAccountInput,
  UpdateAccountOutput,
} from './dtos/update-account.dto';
import { AllAccountsOutput } from './dtos/all-accounts.dto';
import { FindAccountOutput } from './dtos/find-account.dto';
import { DeleteAccountOutput } from './dtos/delete-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accounts: Repository<Account>,
  ) {}

  async create(
    user: User,
    input: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      const account = await this.accounts.save(
        this.accounts.create({
          ...input,
          creatorId: user.id,
        }),
      );
      return { ok: true, newId: account.id };
    } catch (e) {
      return { ok: false, error: 'Could not create an account.' };
    }
  }

  async update(
    user: User,
    input: UpdateAccountInput,
  ): Promise<UpdateAccountOutput> {
    try {
      const account = await this.accounts.findOne({
        id: input.accountId,
        creatorId: user.id,
      });
      if (!account) {
        return {
          ok: false,
          error: 'Account not found.',
        };
      }
      const updated = await this.accounts.save({
        id: account.id,
        ...input,
      });
      return {
        ok: true,
        account: updated,
      };
    } catch (e) {
      return { ok: false, error: 'Could not update the account.' };
    }
  }

  async findAll(user: User): Promise<AllAccountsOutput> {
    try {
      const accounts = await this.accounts.find({
        creatorId: user.id,
      });
      return {
        ok: true,
        accounts,
      };
    } catch (e) {
      return { ok: false, error: 'Could not find all accounts.' };
    }
  }

  async findOne(user: User, accountId: number): Promise<FindAccountOutput> {
    try {
      const account = await this.accounts.findOneOrFail({
        id: accountId,
        creatorId: user.id,
      });
      return {
        ok: true,
        account,
      };
    } catch (e) {
      return { ok: false, error: 'Could not find an account.' };
    }
  }

  async delete(user: User, accountId: number): Promise<DeleteAccountOutput> {
    try {
      const account = await this.accounts.findOne({
        id: accountId,
        creatorId: user.id,
      });
      if (!account) {
        return {
          ok: false,
          error: 'Account not found.',
        };
      }
      await this.accounts.delete(accountId);
      return {
        ok: true,
      };
    } catch (e) {
      return { ok: false, error: 'Could not delete the account.' };
    }
  }
}
