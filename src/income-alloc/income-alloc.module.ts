import { Module } from '@nestjs/common';
import { IncomeAllocService } from './income-alloc.service';
import { IncomeAllocResolver } from './income-alloc.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeAlloc } from './entities/income-alloc.entity';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  imports: [TypeOrmModule.forFeature([IncomeAlloc]), AccountsModule],
  providers: [IncomeAllocService, IncomeAllocResolver],
})
export class IncomeAllocModule {}
