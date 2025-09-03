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
import { UpdateQuizDto } from './dto/update-quiz.dto';

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

  async update(
    id: string,
    dto: UpdateQuizDto, // DTO mirip CreateQuizDto, tapi semua field opsional
  ): Promise<Quiz> {
    // Cari quiz lama beserta relasi questions
    const quiz = await this.quizRepo.findOne({
      where: { id },
      relations: ['questions', 'meeting'],
    });
    if (!quiz) {
      throw new NotFoundException('Quiz tidak ditemukan');
    }

    // Update meeting jika ada
    if (dto.meetingId) {
      const meeting = await this.meetingRepo.findOne({
        where: { id: dto.meetingId },
      });
      if (!meeting) throw new BadRequestException('Meeting tidak ditemukan');
      quiz.meeting = meeting;
    }

    // Update title jika ada
    if (dto.title) {
      quiz.title = dto.title;
    }

    // Update questions jika ada
    if (dto.questions && dto.questions.length > 0) {
      // Hapus questions lama
      await this.questionRepo.remove(quiz.questions);

      // Tambahkan questions baru
      quiz.questions = dto.questions.map((q) => this.questionRepo.create(q));
    }

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
    const quiz = await this.quizRepo.findOne({ where: { id } });
    if (!quiz) {
      throw new NotFoundException('Discussion tidak ditemukan');
    }
    await this.quizRepo.remove(quiz);
  }
}
