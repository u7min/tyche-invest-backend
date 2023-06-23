import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateAssetInput, CreateAssetOutput } from './dtos/create-asset.dto';
import { UpdateAssetInput, UpdateAssetOutput } from './dtos/update-asset.dto';
import { DeleteAssetInput, DeleteAssetOutput } from './dtos/delete-asset.dto';
import { AllAssetsOutput } from './dtos/all-assets.dto';
import { FindAssetInput, FindAssetOutput } from './dtos/find-asset.dto';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private readonly assets: Repository<Asset>,
  ) {}

  async create(
    user: User,
    input: CreateAssetInput,
  ): Promise<CreateAssetOutput> {
    try {
      const asset = await this.assets.save(
        this.assets.create({
          ...input,
          creatorId: user.id,
        }),
      );
      return {
        ok: true,
        newId: asset.id,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Could not create asset.',
      };
    }
  }

  async update(
    user: User,
    input: UpdateAssetInput,
  ): Promise<UpdateAssetOutput> {
    try {
      const exists = await this.assets.findOne({
        where: {
          id: input.assetId,
          creatorId: user.id,
        },
      });
      if (!exists) {
        return {
          ok: false,
          error: 'Asset not found.',
        };
      }
      const asset = await this.assets.save({
        id: input.assetId,
        ...input,
      });
      return {
        ok: true,
        asset,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Could not update the asset.',
      };
    }
  }

  async delete(
    user: User,
    input: DeleteAssetInput,
  ): Promise<DeleteAssetOutput> {
    try {
      const exists = await this.assets.findOne({
        where: {
          id: input.assetId,
          creatorId: user.id,
        },
      });
      if (!exists) {
        return {
          ok: false,
          error: 'Asset not found.',
        };
      }
      await this.assets.delete(input.assetId);
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Could not delete the asset.',
      };
    }
  }

  async findOne(user: User, input: FindAssetInput): Promise<FindAssetOutput> {
    try {
      const asset = await this.assets.findOneOrFail({
        where: {
          creatorId: user.id,
          id: input.assetId,
        },
      });
      return {
        ok: true,
        asset,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Could not find a asset.',
      };
    }
  }

  async findAll(user: User): Promise<AllAssetsOutput> {
    try {
      const assets = await this.assets.find({
        where: {
          creatorId: user.id,
        },
      });
      return {
        ok: true,
        assets,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Could not find all assets.',
      };
    }
  }
}
