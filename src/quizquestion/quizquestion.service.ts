import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuizquestionDto } from './dto/create-quizquestion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Repository } from 'typeorm';
import { QuizQuestion } from './entities/quizquestion.entity';

@Injectable()
export class QuizquestionService {
  constructor(
    @InjectRepository(QuizQuestion)
    private readonly questionRepo: Repository<QuizQuestion>,
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
  ) {}
  async create(dto: CreateQuizquestionDto): Promise<QuizQuestion> {
    const quiz = await this.quizRepo.findOne({ where: { id: dto.quizId } });
    if (!quiz) throw new BadRequestException('Quiz tidak ditemukan');

    if (!dto.options.includes(dto.correctAnswer)) {
      throw new BadRequestException('Jawaban benar tidak terdapat dalam opsi');
    }

    const question = this.questionRepo.create({
      questionText: dto.questionText,
      options: dto.options,
      correctAnswer: dto.correctAnswer,
      quiz,
    });

    return this.questionRepo.save(question);
  }

  async findAll(): Promise<QuizQuestion[]> {
    return this.questionRepo.find({ relations: ['quiz'] });
  }

  async findOne(id: string): Promise<QuizQuestion> {
    const question = await this.questionRepo.findOne({
      where: { id },
      relations: ['quiz'],
    });
    if (!question) throw new NotFoundException('Pertanyaan tidak ditemukan');
    return question;
  }

  async remove(id: string): Promise<void> {
    const question = await this.findOne(id);
    await this.questionRepo.remove(question);
  }
}
