import { Injectable } from '@nestjs/common';
import { CreateProgramStudiDto } from './dto/create-program_studi.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramStudi } from './entities/program_studi.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramStudiService {
  constructor(
    @InjectRepository(ProgramStudi)
    private readonly programStudiRepository: Repository<ProgramStudi>,
  ) {}

  async create(createProgramStudiDto: CreateProgramStudiDto) {
    try {
      const programStudi = this.programStudiRepository.create(
        createProgramStudiDto,
      );
      const savedProgramStudi =
        await this.programStudiRepository.save(programStudi);
      return savedProgramStudi;
    } catch (error) {
      throw new Error(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        'Error creating program studi: ' + (error?.message || 'Unknown error'),
      );
    }
  }

  async findOne(id: string) {
    try {
      return await this.programStudiRepository.findOne({
        where: { id },
      });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new Error('Error finding program studi: ' + error.message);
    }
  }

  async getAll() {
    try {
      const data = await this.programStudiRepository.find({
        select: ['id', 'nama'],
      });
      return data;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new Error('Error fetching program studi: ' + error.message);
    }
  }

  async delete(id: string) {
    try {
      const existing = await this.programStudiRepository.findOne({
        where: { id },
      });
      if (!existing) {
        return { success: false, message: 'Program Studi not found' };
      }
      await this.programStudiRepository.remove(existing);
      return { success: true, message: 'Program Studi deleted successfully' };
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new Error('Error deleting program studi: ' + error.message);
    }
  }
}
