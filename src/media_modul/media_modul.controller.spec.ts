import { Test, TestingModule } from '@nestjs/testing';
import { MediaModulController } from './media_modul.controller';
import { MediaModulService } from './media_modul.service';

describe('MediaModulController', () => {
  let controller: MediaModulController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaModulController],
      providers: [MediaModulService],
    }).compile();

    controller = module.get<MediaModulController>(MediaModulController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
