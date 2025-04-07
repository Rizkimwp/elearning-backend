import { Test, TestingModule } from '@nestjs/testing';
import { ProgramStudiService } from './program_studi.service';

describe('ProgramStudiService', () => {
  let service: ProgramStudiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramStudiService],
    }).compile();

    service = module.get<ProgramStudiService>(ProgramStudiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
