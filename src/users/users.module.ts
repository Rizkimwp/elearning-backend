import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MahasiswaModule } from 'src/mahasiswa/mahasiswa.module';
import { SemesterModule } from 'src/semester/semester.module';
import { ProgramStudiModule } from 'src/program_studi/program_studi.module';

@Module({
  imports: [
    // Add any necessary modules here, e.g., TypeOrmModule for database connections
    TypeOrmModule.forFeature([User]),
    MahasiswaModule,
    SemesterModule,
    ProgramStudiModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
