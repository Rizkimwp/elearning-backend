import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mahasiswa } from './entities/mahasiswa.entity';
import { Repository } from 'typeorm';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';

@Injectable()
export class MahasiswaService {
  constructor(
    @InjectRepository(Mahasiswa)
    private readonly mahasiswaRepository: Repository<Mahasiswa>,
  ) {}

  async create(data: CreateMahasiswaDto): Promise<Mahasiswa> {
    const { idProgramStudi, idSemester, idUser } = data;
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2); // Get last two digits of the year
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Get month and pad with zero if needed

    // Count the number of existing entries to determine the next sequence number
    const count = await this.mahasiswaRepository.count();
    const sequence = (count + 1).toString().padStart(4, '0'); // Pad sequence with leading zeros

    const nim = `${year}${month}${sequence}`;
    const mahasiswa = this.mahasiswaRepository.create({
      nim,
      programStudi: { id: idProgramStudi },
      semester: { id: idSemester },
      user: { id: idUser },
    });
    return this.mahasiswaRepository.save(mahasiswa);
  }
}
