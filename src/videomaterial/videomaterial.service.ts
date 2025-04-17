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
import { extname } from 'path';
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

  async create(
    dto: CreateVideomaterialDto,
    file: Express.Multer.File,
  ): Promise<VideoMaterial> {
    // Validasi file
    if (!file) {
      throw new BadRequestException('File video harus disertakan');
    }

    // Validasi format ekstensi video
    const allowedExtensions = ['.mp4', '.mov', '.avi', '.mkv'];
    const fileExt = extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(fileExt)) {
      throw new BadRequestException(`Format file tidak didukung: ${fileExt}`);
    }

    // Validasi ukuran file maksimum (misalnya 100MB)
    const maxSizeInBytes = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSizeInBytes) {
      throw new BadRequestException('Ukuran file melebihi 100MB');
    }

    const meeting = await this.meetingRepo.findOne({
      where: { id: dto.meetingId },
    });
    if (!meeting) throw new BadRequestException('Meeting tidak ditemukan');

    const uploader = await this.userRepo.findOne({
      where: { id: dto.uploadedById },
    });
    if (!uploader) throw new BadRequestException('Uploader tidak ditemukan');

    const fileUrl = `/uploads/${file.filename}`;
    const video = this.videoRepo.create({
      title: dto.title,
      videoUrl: fileUrl,
      meeting,
      create_by: { id: uploader.id },
    });

    return this.videoRepo.save(video);
  }

  async findAll(): Promise<any[]> {
    const vidio = await this.videoRepo.find({
      relations: ['meeting'],
      order: { createdAt: 'DESC' },
    });

    return vidio.map((vidio) => ({
      id: vidio.id,
      title: vidio.title,
      videoUrl: vidio.videoUrl,
      meeting: {
        id: vidio.meeting.id,
        title: vidio.meeting.title,
        description: vidio.meeting.description,
        order: vidio.meeting.order,
      },
    }));
  }

  async findOne(id: string): Promise<VideoMaterial> {
    const video = await this.videoRepo.findOne({
      where: { id },
      relations: ['meeting'],
    });
    if (!video) throw new NotFoundException('Video tidak ditemukan');
    return video;
  }

  async remove(id: string): Promise<void> {
    const video = await this.findOne(id);
    await this.videoRepo.remove(video);
  }
}
