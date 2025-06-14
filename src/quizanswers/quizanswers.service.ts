import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizAnswer } from './entities/quizanswer.entity';
import { Repository } from 'typeorm';

import { QuizQuestion } from 'src/quizquestion/entities/quizquestion.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateQuizAnswerDto } from './dto/create-quizanswer.dto';

@Injectable()
export class QuizanswersService {
  constructor(
    @InjectRepository(QuizAnswer)
    private readonly quizRepo: Repository<QuizAnswer>,
    @InjectRepository(QuizQuestion)
    private readonly quizQuestionRepo: Repository<QuizAnswer>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createBulk(data: CreateQuizAnswerDto[]): Promise<QuizAnswer[]> {
    const results: QuizAnswer[] = [];

    for (const item of data) {
      const user = await this.userRepo.findOne({ where: { id: item.id_user } });
      if (!user)
        throw new NotFoundException(`User ${item.id_user} tidak ditemukan`);

      const question = await this.quizQuestionRepo.findOne({
        where: { id: item.id_quiz_question },
      });
      if (!question)
        throw new NotFoundException(
          `Question ${item.id_quiz_question} tidak ditemukan`,
        );

      const quizAnswer = this.quizRepo.create({
        answer: item.answer,
        quizQuestion: { id: item.id_quiz_question },
        user: { id: item.id_user },
      });

      results.push(quizAnswer);
    }

    return this.quizRepo.save(results);
  }

  async findAll(): Promise<QuizAnswer[]> {
    return this.quizRepo.find({
      relations: ['quizQuestion', 'user'],
      order: { createdAt: 'ASC' },
    });
  }

  async findByUser(userId: string): Promise<QuizAnswer[]> {
    return this.quizRepo.find({
      where: { user: { id: userId } },
      relations: ['quizQuestion'],
      order: { createdAt: 'ASC' },
    });
  }

  async findByQuestion(questionId: string): Promise<QuizAnswer[]> {
    return this.quizRepo.find({
      where: { quizQuestion: { id: questionId } },
      relations: ['user'],
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<QuizAnswer> {
    const answer = await this.quizRepo.findOne({
      where: { id },
      relations: ['quizQuestion', 'user'],
    });

    if (!answer) throw new NotFoundException('Quiz answer tidak ditemukan');
    return answer;
  }
}
