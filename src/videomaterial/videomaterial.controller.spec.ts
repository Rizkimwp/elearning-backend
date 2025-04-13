import { Test, TestingModule } from '@nestjs/testing';
import { VideomaterialController } from './videomaterial.controller';
import { VideomaterialService } from './videomaterial.service';

describe('VideomaterialController', () => {
  let controller: VideomaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideomaterialController],
      providers: [VideomaterialService],
    }).compile();

    controller = module.get<VideomaterialController>(VideomaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
