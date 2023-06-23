import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncomeAlloc } from './entities/income-alloc.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { AccountsService } from '../accounts/accounts.service';
import { CreateIncomeAllocInput } from './dtos/create-income-alloc.dto';
import {
  AllocationInput,
  AllocationOutput,
} from './dtos/create-allocation.dto';
import {
  DeleteIncomeAllocsInput,
  DeleteIncomeAllocsOutput,
} from './dtos/delete-income-allocs.dto';
import {
  AllIncomeAllocsInput,
  AllIncomeAllocsOutput,
} from './dtos/all-income-allocs.dto';
import { cutTimes } from '../common/date.utils';

@Injectable()
export class IncomeAllocService {
  constructor(
    @InjectRepository(IncomeAlloc)
    private readonly incomeAllocs: Repository<IncomeAlloc>,
    private readonly accountsService: AccountsService,
  ) {}

  async create(
    user: User,
    { yearMonth, income }: AllocationInput,
  ): Promise<AllocationOutput> {
    try {
      const exists = await this.incomeAllocs.find({
        where: {
          yearMonth,
          creatorId: user.id,
        },
      });
      if (exists?.length) {
        return {
          ok: false,
          error: `There is immediately exists allocation data for ${yearMonth}.`,
        };
      }
      const userAccountsOutput = await this.accountsService.findAll(user);
      if (!userAccountsOutput.ok) {
        return {
          ok: false,
          error: userAccountsOutput.error,
        };
      }
      const newAllocations =
        userAccountsOutput.accounts.map<CreateIncomeAllocInput>((account) => {
          return {
            creatorId: user.id,
            yearMonth,
            accountId: account.id,
            accountName: account.name,
            accountNumber: account.accountNumber,
            allocRate: account.allocRate,
            amount: income * account.allocRate,
          };
        });
      for (const alloc of newAllocations) {
        await this.incomeAllocs.save(this.incomeAllocs.create(alloc));
      }
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Could not income into the allocation data.',
      };
    }
  }

  async delete(
    user: User,
    { yearMonth }: DeleteIncomeAllocsInput,
  ): Promise<DeleteIncomeAllocsOutput> {
    try {
      await this.incomeAllocs.delete({
        yearMonth,
        creatorId: user.id,
      });
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Could not delete allocations',
      };
    }
  }

  async findAll(
    user: User,
    { yearMonth }: AllIncomeAllocsInput,
  ): Promise<AllIncomeAllocsOutput> {
    try {
      const allocations = await this.incomeAllocs.find({
        yearMonth: cutTimes(yearMonth),
        creatorId: user.id,
      });
      return {
        ok: true,
        incomeAllocs: allocations,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Could not find all income allocations.',
      };
    }
  }
}
