import { Test, TestingModule } from '@nestjs/testing';
import { MeetingprogressController } from './meetingprogress.controller';
import { MeetingprogressService } from './meetingprogress.service';

describe('MeetingprogressController', () => {
  let controller: MeetingprogressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeetingprogressController],
      providers: [MeetingprogressService],
    }).compile();

    controller = module.get<MeetingprogressController>(MeetingprogressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
