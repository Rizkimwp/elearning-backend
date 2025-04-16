import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateModuleDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  fileUrl?: string;

  @ApiProperty()
  @IsString()
  meetingId: string;

  @ApiProperty()
  @IsString()
  create_by: string;
}
