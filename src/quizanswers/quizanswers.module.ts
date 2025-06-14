import { Module } from '@nestjs/common';
import { QuizanswersService } from './quizanswers.service';
import { QuizanswersController } from './quizanswers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizAnswer } from './entities/quizanswer.entity';
import { QuizQuestion } from 'src/quizquestion/entities/quizquestion.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizAnswer, QuizQuestion, User])],
  controllers: [QuizanswersController],
  providers: [QuizanswersService],
})
export class QuizanswersModule {}
