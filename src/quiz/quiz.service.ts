import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from 'src/meeting/entities/meeting.entity';
import { QuizQuestion } from 'src/quizquestion/entities/quizquestion.entity';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepo: Repository<Quiz>,

    @InjectRepository(Meeting)
    private meetingRepo: Repository<Meeting>,

    @InjectRepository(QuizQuestion)
    private questionRepo: Repository<QuizQuestion>,
  ) {}

  async create(dto: CreateQuizDto): Promise<Quiz> {
    const meeting = await this.meetingRepo.findOne({
      where: { id: dto.meetingId },
    });
    if (!meeting) throw new BadRequestException('Meeting tidak ditemukan');

    const quiz = this.quizRepo.create({
      title: dto.title,
      meeting,
      questions: dto.questions.map((question) =>
        this.questionRepo.create(question),
      ),
    });

    return this.quizRepo.save(quiz);
  }

  async findAll(): Promise<Quiz[]> {
    return this.quizRepo.find({
      relations: ['questions', 'meeting', 'questions.quizAnswers.user'],
      order: { title: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Quiz> {
    const quiz = await this.quizRepo.findOne({
      where: { id },
      relations: ['questions', 'meeting'],
    });
    if (!quiz) throw new NotFoundException('Quiz tidak ditemukan');
    return quiz;
  }

  async remove(id: string): Promise<void> {
    const quiz = await this.findOne(id);
    await this.quizRepo.remove(quiz);
  }
}
