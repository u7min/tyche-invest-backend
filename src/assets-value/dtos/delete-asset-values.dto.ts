import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';
import { AssetValue } from '../entities/asset-value.entity';

@InputType()
export class DeleteAssetValuesInput extends PickType(AssetValue, [
  'yearMonth',
]) {}

@ObjectType()
export class DeleteAssetValuesOutput extends CoreOutput {}
