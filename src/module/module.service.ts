import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from 'src/meeting/entities/meeting.entity';
import { Repository } from 'typeorm';
import { Module } from './entities/module.entity';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Meeting)
    private readonly meetingRepo: Repository<Meeting>,

    @InjectRepository(Module)
    private readonly modulRepo: Repository<Module>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<any[]> {
    const modules = await this.modulRepo.find({
      relations: ['meeting'],
      order: { createdAt: 'DESC' },
    });

    return modules.map((modul) => ({
      id: modul.id,
      title: modul.title,
      content: modul.content,
      fileUrl: modul.fileUrl,
      meeting: {
        id: modul.meeting.id,
        title: modul.meeting.title,
        description: modul.meeting.description,
        order: modul.meeting.order,
      },
    }));
  }

  async findOne(id: string): Promise<Module> {
    const material = await this.modulRepo.findOne({
      where: { id },
      relations: ['meeting', 'createdBy'],
    });
    if (!material) throw new NotFoundException('Material not found');
    return material;
  }

  async create(
    dto: CreateModuleDto,
    file: Express.Multer.File,
  ): Promise<Module> {
    // Cari meeting berdasarkan meetingId
    const meeting = await this.meetingRepo.findOne({
      where: { id: dto.meetingId },
    });

    // Jika meeting tidak ditemukan, lemparkan error NotFoundException
    if (!meeting) throw new NotFoundException('Meeting not found');

    // Jika file ada, tentukan URL untuk file tersebut
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const fileUrl = `/uploads/${file.filename}`;

    // Cari user berdasarkan ID yang ada di dto.create_by
    const createByUser = await this.userRepo.findOne({
      where: { id: dto.create_by },
    });

    // Jika user tidak ditemukan, lemparkan error NotFoundException
    if (!createByUser) throw new NotFoundException('User not found');

    // Buat objek material baru dengan data dari dto dan fileUrl
    const material = this.modulRepo.create({
      ...dto,
      fileUrl,
      meeting,
      create_by: createByUser, // Tentukan user yang membuat
    });

    // Simpan dan kembalikan material yang baru dibuat
    return this.modulRepo.save(material);
  }

  async update(id: string, dto: UpdateModuleDto): Promise<Module> {
    const material = await this.findOne(id);
    Object.assign(material, dto);
    return this.modulRepo.save(material);
  }

  async remove(id: string): Promise<void> {
    const material = await this.findOne(id);
    await this.modulRepo.remove(material);
  }
}
