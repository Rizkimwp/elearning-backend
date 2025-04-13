import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAssignmentDto {
  @ApiProperty({
    type: String,
    description: 'id Meeting',
    example: 'ASdfa21!sad123141asda',
  })
  @IsUUID()
  meetingId: string;
  @ApiProperty({
    type: String,
    description: 'Id Student',
    example: 'ASdfa21!sad123141asda',
  })
  @IsUUID()
  studentId: string;

  @ApiProperty()
  @IsNotEmpty()
  filePath: string;

  @ApiProperty()
  @IsOptional()
  note?: string;
}
