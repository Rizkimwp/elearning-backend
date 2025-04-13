import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVideomaterialDto } from './dto/create-videomaterial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from 'src/meeting/entities/meeting.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { VideoMaterial } from './entities/videomaterial.entity';

@Injectable()
export class VideomaterialService {
  constructor(
    @InjectRepository(VideoMaterial)
    private readonly videoRepo: Repository<VideoMaterial>,
    @InjectRepository(Meeting)
    private readonly meetingRepo: Repository<Meeting>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateVideomaterialDto): Promise<VideoMaterial> {
    const meeting = await this.meetingRepo.findOne({
      where: { id: dto.meetingId },
    });
    if (!meeting) throw new BadRequestException('Meeting tidak ditemukan');

    const uploader = await this.userRepo.findOne({
      where: { id: dto.uploadedById },
    });
    if (!uploader) throw new BadRequestException('Uploader tidak ditemukan');

    const video = this.videoRepo.create({
      title: dto.title,
      videoUrl: dto.videoUrl,
      meeting,
      uploadedBy: uploader,
    });

    return this.videoRepo.save(video);
  }

  async findAll(): Promise<VideoMaterial[]> {
    return this.videoRepo.find({
      relations: ['meeting', 'uploadedBy'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<VideoMaterial> {
    const video = await this.videoRepo.findOne({
      where: { id },
      relations: ['meeting', 'uploadedBy'],
    });
    if (!video) throw new NotFoundException('Video tidak ditemukan');
    return video;
  }

  async remove(id: string): Promise<void> {
    const video = await this.findOne(id);
    await this.videoRepo.remove(video);
  }
}
