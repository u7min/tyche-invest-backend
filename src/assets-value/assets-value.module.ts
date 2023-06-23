import { Module } from '@nestjs/common';
import { AssetsValueService } from './assets-value.service';
import { AssetsValueResolver } from './assets-value.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetValue } from './entities/asset-value.entity';
import { AssetsModule } from '../assets/assets.module';

@Module({
  imports: [TypeOrmModule.forFeature([AssetValue]), AssetsModule],
  providers: [AssetsValueService, AssetsValueResolver],
})
export class AssetsValueModule {}
