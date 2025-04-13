import { Test, TestingModule } from '@nestjs/testing';
import { DiscussionreplyController } from './discussionreply.controller';
import { DiscussionreplyService } from './discussionreply.service';

describe('DiscussionreplyController', () => {
  let controller: DiscussionreplyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscussionreplyController],
      providers: [DiscussionreplyService],
    }).compile();

    controller = module.get<DiscussionreplyController>(DiscussionreplyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
