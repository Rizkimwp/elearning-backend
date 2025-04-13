import { PartialType } from '@nestjs/swagger';
import { CreateQuizquestionDto } from './create-quizquestion.dto';

export class UpdateQuizquestionDto extends PartialType(CreateQuizquestionDto) {}
