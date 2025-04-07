import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { MahasiswaService } from 'src/mahasiswa/mahasiswa.service';
import { plainToInstance } from 'class-transformer';
import { ProgramStudiService } from 'src/program_studi/program_studi.service';
import { SemesterService } from 'src/semester/semester.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly semester: SemesterService,
    private readonly programStudi: ProgramStudiService,
    private readonly mahasiswaService: MahasiswaService,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(data);

      const idProgramStudi = await this.programStudi.findOne(
        data.idProgramStudi,
      );
      const idSemester = await this.semester.findOne(data.idSemester);

      if (!idSemester) {
        return plainToInstance(User, {
          success: false,
          message: 'Semester not found',
        });
      }

      if (!idProgramStudi) {
        return plainToInstance(User, {
          success: false,
          message: 'Program Studi not found',
        });
      }

      await this.userRepository.save(user);

      if (data.role === UserRole.MAHASISWA) {
        console.log('Creating Mahasiswa record');
        try {
          await this.mahasiswaService.create({
            idProgramStudi: data.idProgramStudi,
            idSemester: data.idSemester,
            idUser: user.id,
          });
        } catch (error) {
          await this.userRepository.delete(user.id); // Rollback user creation
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          throw new Error(`Failed to create Mahasiswa: ${error.message}`);
        }
      }

      return plainToInstance(User, user);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }
}
