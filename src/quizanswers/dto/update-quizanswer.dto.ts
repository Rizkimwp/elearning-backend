import { PartialType } from '@nestjs/swagger';
import { CreateQuizAnswerDto } from './create-quizanswer.dto';

export class UpdateQuizanswerDto extends PartialType(CreateQuizAnswerDto) {}
