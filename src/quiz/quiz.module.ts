import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Meeting } from 'src/meeting/entities/meeting.entity';
import { QuizQuestion } from 'src/quizquestion/entities/quizquestion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Meeting, QuizQuestion])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
