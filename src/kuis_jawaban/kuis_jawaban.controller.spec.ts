import { Test, TestingModule } from '@nestjs/testing';
import { KuisJawabanController } from './kuis_jawaban.controller';
import { KuisJawabanService } from './kuis_jawaban.service';

describe('KuisJawabanController', () => {
  let controller: KuisJawabanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KuisJawabanController],
      providers: [KuisJawabanService],
    }).compile();

    controller = module.get<KuisJawabanController>(KuisJawabanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
