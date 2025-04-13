import { Module } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionController } from './discussion.controller';
import { Discussion } from './entities/discussion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from 'src/meeting/entities/meeting.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Discussion, Meeting, User])],
  controllers: [DiscussionController],
  providers: [DiscussionService],
})
export class DiscussionModule {}
