import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
  CreateAssetValueInput,
  CreateAssetValueOutput,
} from './dtos/create-asset-value.dto';
import { AssetValue } from './entities/asset-value.entity';
import { DeleteAssetValuesInput } from './dtos/delete-asset-values.dto';
import {
  AllAssetValuesInput,
  AllAssetValuesOutput,
} from './dtos/all-asset-values.dto';
import { cutTimes } from '../common/date.utils';
import { AssetsService } from '../assets/assets.service';

@Injectable()
export class AssetsValueService {
  constructor(
    @InjectRepository(AssetValue)
    private readonly assetValues: Repository<AssetValue>,
    private readonly assetsService: AssetsService,
  ) {}

  async create(
    user: User,
    { yearMonth }: CreateAssetValueInput,
  ): Promise<CreateAssetValueOutput> {
    try {
      const exists = await this.assetValues.find({
        where: {
          creatorId: user.id,
          yearMonth: cutTimes(yearMonth),
        },
      });
      if (exists?.length) {
        return {
          ok: false,
          error: `There is immediately exists asset value for ${yearMonth}.`,
        };
      }
      const userAssetsOutput = await this.assetsService.findAll(user);
      if (!userAssetsOutput.ok) {
        return {
          ok: false,
          error: userAssetsOutput.error,
        };
      }
      const newAssetsValues =
        userAssetsOutput.assets.map<CreateAssetValueInput>((asset) => {
          const realtimeValue = 1000;
          return {
            creatorId: user.id,
            yearMonth,
            assetId: asset.id,
            value: asset.amount * realtimeValue,
            askAvg: 0,
            perform: 0,
          };
        });
      for (const assetsValue of newAssetsValues) {
        await this.assetValues.save(this.assetValues.create(assetsValue));
      }
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: true,
        error: 'Could not create asset value.',
      };
    }
  }

  async delete(user: User, { yearMonth }: DeleteAssetValuesInput) {
    try {
      await this.assetValues.delete({
        creatorId: user.id,
        yearMonth: cutTimes(yearMonth),
      });
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: true,
        error: 'Could not delete asset values.',
      };
    }
  }

  async findAll(
    user: User,
    { yearMonth }: AllAssetValuesInput,
  ): Promise<AllAssetValuesOutput> {
    try {
      const assetValues = await this.assetValues.find({
        where: {
          creatorId: user.id,
          yearMonth: cutTimes(yearMonth),
        },
      });
      return {
        ok: true,
        assetValues,
      };
    } catch (e) {
      return {
        ok: true,
        error: 'Could not find all asset values.',
      };
    }
  }
}
