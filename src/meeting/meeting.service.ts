import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from './entities/meeting.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
  ) {}
  async findAll(): Promise<Meeting[]> {
    return this.meetingRepository.find({ relations: ['createdBy'] });
  }

  async findOne(id: string): Promise<Meeting> {
    const meeting = await this.meetingRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });
    if (!meeting)
      throw new NotFoundException(`Meeting with ID ${id} not found`);
    return meeting;
  }

  async create(
    createMeetingDto: CreateMeetingDto,
    user: User,
  ): Promise<Meeting> {
    const meeting = this.meetingRepository.create({
      ...createMeetingDto,
      createdBy: user,
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
}
