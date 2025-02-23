import { Test, TestingModule } from '@nestjs/testing';
import { AssetDailyService } from './asset-daily.service';

describe('AssetDailyService', () => {
  let service: AssetDailyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetDailyService],
    }).compile();

    service = module.get<AssetDailyService>(AssetDailyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
