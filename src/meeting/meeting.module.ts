import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { Meeting } from './entities/meeting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { MeetingProgress } from 'src/meetingprogress/entities/meetingprogress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting, User, MeetingProgress])],
  controllers: [MeetingController],
  providers: [MeetingService],
})
export class MeetingModule {}
