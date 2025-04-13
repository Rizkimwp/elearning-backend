import { Test, TestingModule } from '@nestjs/testing';
import { DiscussionreplyService } from './discussionreply.service';

describe('DiscussionreplyService', () => {
  let service: DiscussionreplyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscussionreplyService],
    }).compile();

    service = module.get<DiscussionreplyService>(DiscussionreplyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
