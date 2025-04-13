import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
  ArrayMinSize,
  IsArray,
} from 'class-validator';

class QuizQuestionDto {
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
}

export class CreateQuizDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  meetingId: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => QuizQuestionDto)
  questions: QuizQuestionDto[];
}
