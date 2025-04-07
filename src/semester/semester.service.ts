import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Semester } from './entities/semester.entity';
import { Repository } from 'typeorm';
import { CreateSemesterDto } from './dto/create-semester.dto';

@Injectable()
export class SemesterService {
  constructor(
    @InjectRepository(Semester)
    private readonly semesterRepository: Repository<Semester>,
  ) {}

  async create(
    data: CreateSemesterDto,
    endAt: string,
    startAt: string,
  ): Promise<Semester> {
    try {
      const semester = this.semesterRepository.create({
        tahun_ajaran: data.tahun_ajaran,
        end_at: endAt,
        start_at: startAt,
      });
      return await this.semesterRepository.save(semester);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new Error(`Failed to create semester: ${error.message}`);
    }
  }

  async findAll(): Promise<Semester[]> {
    try {
      return await this.semesterRepository.find({
        select: ['id', 'tahun_ajaran', 'start_at', 'end_at'],
      });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new Error(`Failed to retrieve semesters: ${error.message}`);
    }
  }

  async delete(id: string): Promise<{ success: boolean; message: string }> {
    try {
      const existing = await this.semesterRepository.findOne({
        where: { id },
      });
      if (!existing) {
        return { success: false, message: 'Semester not found' };
      }
      await this.semesterRepository.delete(id);
      return { success: true, message: 'Semester deleted successfully' };
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new Error(`Failed to delete semester: ${error.message}`);
    }
  }

  async findOne(id: string) {
    return await this.semesterRepository.findOne({
      where: { id: id },
    });
  }
}
