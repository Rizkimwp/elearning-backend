import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  IsUUID,
} from 'class-validator';

export class CreateQuizquestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  questionText: string;

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  options: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  correctAnswer: string;

  @ApiProperty()
  @IsUUID()
  quizId: string;
}
