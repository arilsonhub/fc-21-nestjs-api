import { Test, TestingModule } from '@nestjs/testing';
import { AssetDailyController } from './asset-daily.controller';
import { AssetDailyService } from './asset-daily.service';

describe('AssetDailyController', () => {
  let controller: AssetDailyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetDailyController],
      providers: [AssetDailyService],
    }).compile();

    controller = module.get<AssetDailyController>(AssetDailyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
