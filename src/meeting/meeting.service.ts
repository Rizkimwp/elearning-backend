import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from './entities/meeting.entity';
import { ILike, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(
    filter?: 'terbaru' | 'sudah_lama' | 'semua',
    title?: string,
  ): Promise<Meeting[]> {
    let order: any = {};

    switch (filter) {
      case 'terbaru':
        order = { createdAt: 'DESC' };
        break;
      case 'sudah_lama':
        order = { createdAt: 'ASC' };
        break;
      case 'semua':
      default:
        order = {};
        break;
    }

    const where: any = {};
    if (title) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      where.title = ILike(`%${title}%`);
    }

    return this.meetingRepository.find({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      order,
      relations: [
        'create_by',
        'quizzes',
        'quizzes.questions',
        'progresses.create_by',
        'progresses.meeting',
      ],
    });
  }

  async findNew(): Promise<Meeting> {
    const meetings = await this.meetingRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['create_by'],
      take: 1,
    });

    const meeting = meetings[0];
    if (!meeting) throw new NotFoundException('Meeting baru tidak ditemukan');
    return meeting;
  }

  async findOne(id: string): Promise<Meeting> {
    const meeting = await this.meetingRepository.findOne({
      where: { id },
      relations: ['create_by'],
    });
    if (!meeting)
      throw new NotFoundException(`Meeting with ID ${id} not found`);
    return meeting;
  }

  async create(createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    const user = await this.userRepository.findOne({
      where: { id: createMeetingDto.create_by },
    });
    if (!user) throw new NotFoundException('Guru tidak ditemukan');

    const meeting = this.meetingRepository.create({
      ...createMeetingDto,
      create_by: { id: createMeetingDto.create_by } as User,
    });
    return this.meetingRepository.save(meeting);
  }

  async update(
    id: string,
    updateMeetingDto: UpdateMeetingDto,
  ): Promise<Meeting> {
    const meeting = await this.findOne(id);
    Object.assign(meeting, updateMeetingDto);
    return this.meetingRepository.save(meeting);
  }

  async remove(id: string): Promise<void> {
    const meeting = await this.findOne(id);
    await this.meetingRepository.remove(meeting);
  }

  async getTotalMeeting(): Promise<number> {
    const count = await this.meetingRepository.count();
    return count;
  }
}
