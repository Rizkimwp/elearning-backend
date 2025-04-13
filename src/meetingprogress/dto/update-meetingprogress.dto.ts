import { PartialType } from '@nestjs/swagger';
import { CreateMeetingprogressDto } from './create-meetingprogress.dto';

export class UpdateMeetingprogressDto extends PartialType(CreateMeetingprogressDto) {}
