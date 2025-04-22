import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDiscussionDto } from './dto/create-discussion.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Discussion } from './entities/discussion.entity';
import { Meeting } from 'src/meeting/entities/meeting.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscussionService {
  constructor(
    @InjectRepository(Discussion)
    private readonly discussionRepo: Repository<Discussion>,

    @InjectRepository(Meeting)
    private meetingRepo: Repository<Meeting>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateDiscussionDto): Promise<Discussion> {
    const meeting = await this.meetingRepo.findOne({
      where: { id: dto.meetingId },
    });
    if (!meeting) throw new BadRequestException('Meeting tidak ditemukan');

    const user = await this.userRepo.findOne({
      where: { id: dto.createdById },
    });
    if (!user) throw new BadRequestException('User tidak ditemukan');

    const discussion = this.discussionRepo.create({
      title: dto.title,
      content: dto.content,
      meeting,
      create_by: user,
    });

    return this.discussionRepo.save(discussion);
  }

  async findAll(): Promise<any[]> {
    const diskusi = await this.discussionRepo.find({
      relations: [
        'meeting',
        'discussionReplies',
        'discussionReplies.create_by',
      ],
      order: {
        createdAt: 'ASC', // Order diskusi
        discussionReplies: {
          createdAt: 'DESC', // Order balasan di dalam diskusi
        },
      },
    });

    return diskusi.map((d) => ({
      id: d.id,
      title: d.title,
      content: d.content,
      createdAt: d.createdAt,
      meeting: {
        id: d.meeting?.id ?? '',
        title: d.meeting?.title ?? '',
        description: d.meeting?.description ?? '',
      },
      discussionReplies:
        d.discussionReplies?.map((reply) => ({
          id: reply.id,
          message: reply.message,
          createdAt: reply.createdAt,
          create_by: {
            id: reply.create_by?.id ?? '',
            nama: reply.create_by?.nama ?? '',
          },
        })) ?? [],
    }));
  }

  async findOne(id: string): Promise<Discussion> {
    const discussion = await this.discussionRepo.findOne({
      where: { id },
      relations: ['meeting', 'create_by'],
    });
    if (!discussion) throw new NotFoundException('Diskusi tidak ditemukan');
    return discussion;
  }

  async remove(id: string): Promise<void> {
    const discussion = await this.findOne(id);
    await this.discussionRepo.remove(discussion);
  }
}
