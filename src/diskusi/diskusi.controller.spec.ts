import { Test, TestingModule } from '@nestjs/testing';
import { DiskusiController } from './diskusi.controller';
import { DiskusiService } from './diskusi.service';

describe('DiskusiController', () => {
  let controller: DiskusiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiskusiController],
      providers: [DiskusiService],
    }).compile();

    controller = module.get<DiskusiController>(DiskusiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
