import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from 'src/meeting/entities/meeting.entity';
import { Repository } from 'typeorm';
import { Module } from './entities/module.entity';
import { CreateModuleDto } from './dto/create-module.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Meeting)
    private readonly meetingRepo: Repository<Meeting>,

    @InjectRepository(Module)
    private readonly modulRepo: Repository<Module>,
  ) {}

  async findAll(): Promise<Module[]> {
    return this.modulRepo.find({ relations: ['meeting', 'createdBy'] });
  }

  async findOne(id: string): Promise<Module> {
    const material = await this.modulRepo.findOne({
      where: { id },
      relations: ['meeting', 'createdBy'],
    });
    if (!material) throw new NotFoundException('Material not found');
    return material;
  }

  async create(dto: CreateModuleDto, user: User): Promise<Module> {
    const meeting = await this.meetingRepo.findOne({
      where: { id: dto.meetingId },
    });
    if (!meeting) throw new NotFoundException('Meeting not found');

    const material = this.modulRepo.create({
      ...dto,
      meeting,
      createdBy: user,
    });

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
