import { Test, TestingModule } from '@nestjs/testing';
import { MeetingprogressService } from './meetingprogress.service';

describe('MeetingprogressService', () => {
  let service: MeetingprogressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeetingprogressService],
    }).compile();

    service = module.get<MeetingprogressService>(MeetingprogressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
