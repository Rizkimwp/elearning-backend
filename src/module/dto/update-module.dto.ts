import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateModuleDto } from './create-module.dto';
import { IsString, IsOptional } from 'class-validator';

export class UpdateModuleDto extends PartialType(CreateModuleDto) {
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
