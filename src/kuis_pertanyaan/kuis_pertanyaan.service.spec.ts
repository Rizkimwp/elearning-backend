import { Test, TestingModule } from '@nestjs/testing';
import { KuisPertanyaanService } from './kuis_pertanyaan.service';

describe('KuisPertanyaanService', () => {
  let service: KuisPertanyaanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KuisPertanyaanService],
    }).compile();

    service = module.get<KuisPertanyaanService>(KuisPertanyaanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
