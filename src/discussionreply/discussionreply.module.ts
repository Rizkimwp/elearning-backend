import { Module } from '@nestjs/common';
import { DiscussionreplyService } from './discussionreply.service';
import { DiscussionreplyController } from './discussionreply.controller';
import { DiscussionReply } from './entities/discussionreply.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discussion } from 'src/discussion/entities/discussion.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiscussionReply, Discussion, User])],
  controllers: [DiscussionreplyController],
  providers: [DiscussionreplyService],
})
export class DiscussionreplyModule {}
