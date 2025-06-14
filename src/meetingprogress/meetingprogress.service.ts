import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMeetingprogressDto } from './dto/create-meetingprogress.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from 'src/meeting/entities/meeting.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { MeetingProgress } from './entities/meetingprogress.entity';

@Injectable()
export class MeetingprogressService {
  constructor(
    @InjectRepository(MeetingProgress)
    private readonly progressRepo: Repository<MeetingProgress>,
    @InjectRepository(Meeting)
    private readonly meetingRepo: Repository<Meeting>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateMeetingprogressDto): Promise<MeetingProgress> {
    const meeting = await this.meetingRepo.findOne({
      where: { id: dto.meetingId },
    });
    if (!meeting) throw new BadRequestException('Meeting tidak ditemukan');

    const student = await this.userRepo.findOne({
      where: { id: dto.studentId },
    });
    if (!student) throw new BadRequestException('Siswa tidak ditemukan');

    const progress = this.progressRepo.create({
      meeting,
      create_by: { id: student.id },
      quizCompleted: dto.quizCompleted ?? false,
      moduleRead: dto.moduleRead ?? false,
      videoWatched: dto.videoWatched ?? false,
      participatedInDiscussion: dto.participatedInDiscussion ?? false,
      assignmentUploaded: dto.assignmentUploaded ?? false,
    });
    // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions

    return this.progressRepo.save(progress);
  }

  async findAll(): Promise<MeetingProgress[]> {
    return this.progressRepo.find({
      relations: ['meeting', 'student'],
      order: { updatedAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<MeetingProgress> {
    const progress = await this.progressRepo.findOne({
      where: { id },
      relations: ['meeting', 'student'],
    });
    if (!progress) throw new NotFoundException('Progress tidak ditemukan');
    return progress;
  }

  async update(
    id: string,
    dto: Partial<CreateMeetingprogressDto>,
  ): Promise<MeetingProgress> {
    const progress = await this.findOne(id);

    Object.assign(progress, dto);

    return this.progressRepo.save(progress);
  }

  async remove(id: string): Promise<void> {
    const progress = await this.findOne(id);
    await this.progressRepo.remove(progress);
  }
}
