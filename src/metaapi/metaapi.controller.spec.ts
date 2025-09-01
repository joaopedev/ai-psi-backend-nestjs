import { Test, TestingModule } from '@nestjs/testing';
import { MetaapiController } from './metaapi.controller';
import { MetaapiService } from './metaapi.service';

describe('MetaapiController', () => {
  let controller: MetaapiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetaapiController],
      providers: [MetaapiService],
    }).compile();

    controller = module.get<MetaapiController>(MetaapiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
