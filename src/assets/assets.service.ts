/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { Model } from 'mongoose';
import { Asset } from './entities/asset.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AssetsPresenter } from './assets.presenter';
import { Observable } from 'rxjs';

@Injectable()
export class AssetsService {
  constructor(@InjectModel(Asset.name) private assetSchema: Model<Asset>) {}

  async create(createAssetDto: CreateAssetDto) {
    const asset = await this.assetSchema.create(createAssetDto);
    return new AssetsPresenter(asset);
  }

  async findAll() {
    const assets = await this.assetSchema.find();
    return assets.map((asset) => new AssetsPresenter(asset));
  }

  async findOne(symbol: string) {
    const asset = await this.assetSchema.findOne({ symbol });
    return new AssetsPresenter(asset!);
  }

  subscribeNewPriceChangedEvents(): Observable<Asset> {
    return new Observable((observer) => {
      this.assetSchema
        .watch(
          [
            {
              $match: {
                $or: [
                  { operationType: 'update' },
                  { operationType: 'replace' },
                ],
              },
            },
          ],
          {
            fullDocument: 'updateLookup',
            fullDocumentBeforeChange: 'whenAvailable',
          },
        )
        .on('change', async (data) => {
          if (
            data.fullDocumentBeforeChange !== null &&
            data.fullDocument.price === data.fullDocumentBeforeChange.price
          ) {
            return;
          }
          const asset = await this.assetSchema.findById(data.fullDocument._id);
          observer.next(asset!);
        });
    });
  }
}
