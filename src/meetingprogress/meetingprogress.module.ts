import { Module } from '@nestjs/common';
import { MeetingprogressService } from './meetingprogress.service';
import { MeetingprogressController } from './meetingprogress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingProgress } from './entities/meetingprogress.entity';
import { Meeting } from 'src/meeting/entities/meeting.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MeetingProgress, Meeting, User])],
  controllers: [MeetingprogressController],
  providers: [MeetingprogressService],
})
export class MeetingprogressModule {}
