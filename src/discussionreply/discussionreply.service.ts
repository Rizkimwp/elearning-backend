import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDiscussionreplyDto } from './dto/create-discussionreply.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discussion } from 'src/discussion/entities/discussion.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { DiscussionReply } from './entities/discussionreply.entity';

@Injectable()
export class DiscussionreplyService {
  constructor(
    @InjectRepository(DiscussionReply)
    private readonly replyRepo: Repository<DiscussionReply>,

    @InjectRepository(Discussion)
    private readonly discussionRepo: Repository<Discussion>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  async create(dto: CreateDiscussionreplyDto): Promise<DiscussionReply> {
    const discussion = await this.discussionRepo.findOne({
      where: { id: dto.discussionId },
    });
    if (!discussion) throw new BadRequestException('Diskusi tidak ditemukan');

    const user = await this.userRepo.findOne({
      where: { id: dto.createdById },
    });
    if (!user) throw new BadRequestException('User tidak ditemukan');

    const reply = this.replyRepo.create({
      message: dto.message,
      discussion,
      createdBy: user,
    });

    return this.replyRepo.save(reply);
  }

  async findAll(): Promise<DiscussionReply[]> {
    return this.replyRepo.find({
      relations: ['discussion', 'createdBy'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByDiscussionId(discussionId: string): Promise<DiscussionReply[]> {
    return this.replyRepo.find({
      where: { discussion: { id: discussionId } },
      relations: ['createdBy', 'discussion'],
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<DiscussionReply> {
    const reply = await this.replyRepo.findOne({
      where: { id },
      relations: ['discussion', 'createdBy'],
    });
    if (!reply) throw new NotFoundException('Balasan tidak ditemukan');
    return reply;
  }

  async remove(id: string): Promise<void> {
    const reply = await this.findOne(id);
    await this.replyRepo.remove(reply);
  }
}
