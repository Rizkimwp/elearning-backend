import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateVideomaterialDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  videoUrl: string;
  @ApiProperty()
  @IsUUID()
  meetingId: string;
  @ApiProperty()
  @IsUUID()
  uploadedById: string;
}
