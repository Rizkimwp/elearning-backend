import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from 'src/meeting/entities/meeting.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepo: Repository<Assignment>,
    @InjectRepository(Meeting)
    private meetingRepo: Repository<Meeting>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateAssignmentDto): Promise<Assignment> {
    const meeting = await this.meetingRepo.findOne({
      where: { id: dto.meetingId },
    });
    if (!meeting) throw new BadRequestException('Meeting tidak ditemukan');

    const student = await this.userRepo.findOne({
      where: { id: dto.studentId },
    });
    if (!student) throw new BadRequestException('Siswa tidak ditemukan');

    const assignment = this.assignmentRepo.create({
      meeting,
      student,
      filePath: dto.filePath,
      note: dto.note,
    });

    return this.assignmentRepo.save(assignment);
  }

  async findAll(): Promise<Assignment[]> {
    return this.assignmentRepo.find({
      relations: ['meeting', 'student'],
      order: { submittedAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Assignment> {
    const assignment = await this.assignmentRepo.findOne({
      where: { id },
      relations: ['meeting', 'student'],
    });
    if (!assignment) throw new NotFoundException('Assignment tidak ditemukan');
    return assignment;
  }

  async update(
    id: string,
    dto: Partial<CreateAssignmentDto>,
  ): Promise<Assignment> {
    const assignment = await this.findOne(id);

    if (dto.filePath) assignment.filePath = dto.filePath;
    if (dto.note !== undefined) assignment.note = dto.note;

    return this.assignmentRepo.save(assignment);
  }

  async remove(id: string): Promise<void> {
    const assignment = await this.findOne(id);
    await this.assignmentRepo.remove(assignment);
  }
}
