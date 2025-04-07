import { Test, TestingModule } from '@nestjs/testing';
import { KuisJawabanService } from './kuis_jawaban.service';

describe('KuisJawabanService', () => {
  let service: KuisJawabanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KuisJawabanService],
    }).compile();

    service = module.get<KuisJawabanService>(KuisJawabanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
