import { Test, TestingModule } from '@nestjs/testing';
import { MetaapiService } from './metaapi.service';

describe('MetaapiService', () => {
  let service: MetaapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetaapiService],
    }).compile();

    service = module.get<MetaapiService>(MetaapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
