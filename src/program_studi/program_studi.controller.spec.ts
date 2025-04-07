import { Test, TestingModule } from '@nestjs/testing';
import { ProgramStudiController } from './program_studi.controller';
import { ProgramStudiService } from './program_studi.service';

describe('ProgramStudiController', () => {
  let controller: ProgramStudiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramStudiController],
      providers: [ProgramStudiService],
    }).compile();

    controller = module.get<ProgramStudiController>(ProgramStudiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
