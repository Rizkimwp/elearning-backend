import { Test, TestingModule } from '@nestjs/testing';
import { VideomaterialService } from './videomaterial.service';

describe('VideomaterialService', () => {
  let service: VideomaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideomaterialService],
    }).compile();

    service = module.get<VideomaterialService>(VideomaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
