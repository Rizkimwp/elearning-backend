import { Test, TestingModule } from '@nestjs/testing';
import { MediaModulService } from './media_modul.service';

describe('MediaModulService', () => {
  let service: MediaModulService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaModulService],
    }).compile();

    service = module.get<MediaModulService>(MediaModulService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
