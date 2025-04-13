import { Module } from '@nestjs/common';
import { QuizquestionService } from './quizquestion.service';
import { QuizquestionController } from './quizquestion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizQuestion } from './entities/quizquestion.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizQuestion, Quiz])],
  controllers: [QuizquestionController],
  providers: [QuizquestionService],
})
export class QuizquestionModule {}
