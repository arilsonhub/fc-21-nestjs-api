import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset, AssetSchema } from './entities/asset.entity';
import { AssetsGateway } from './assets.gateway';
import { AssetDaily, AssetDailySchema } from './entities/asset-daily.entity';
import { AssetDailyController } from './asset-daily.controller';
import { AssetDailyService } from './asset-daily.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Asset.name,
        schema: AssetSchema,
      },
      {
        name: AssetDaily.name,
        schema: AssetDailySchema,
      },
    ]),
  ],
  controllers: [AssetsController, AssetDailyController],
  providers: [AssetsService, AssetsGateway, AssetDailyService],
  exports: [AssetsService],
})
export class AssetsModule {}
