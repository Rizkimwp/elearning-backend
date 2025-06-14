import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuizAnswerDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id_quiz_question: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id_user: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  answer: string;
}
