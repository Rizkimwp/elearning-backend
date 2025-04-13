import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsBoolean } from 'class-validator';

export class CreateMeetingprogressDto {
  @ApiProperty()
  @IsUUID()
  meetingId: string;
  @ApiProperty()
  @IsUUID()
  studentId: string;
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  quizCompleted?: boolean;
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  moduleRead?: boolean;
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  videoWatched?: boolean;
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  participatedInDiscussion?: boolean;
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  assignmentUploaded?: boolean;
}
