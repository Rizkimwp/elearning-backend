import { Test, TestingModule } from '@nestjs/testing';
import { KuisPertanyaanController } from './kuis_pertanyaan.controller';
import { KuisPertanyaanService } from './kuis_pertanyaan.service';

describe('KuisPertanyaanController', () => {
  let controller: KuisPertanyaanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KuisPertanyaanController],
      providers: [KuisPertanyaanService],
    }).compile();

    controller = module.get<KuisPertanyaanController>(KuisPertanyaanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
