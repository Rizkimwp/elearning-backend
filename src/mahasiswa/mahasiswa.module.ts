import { Module } from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { MahasiswaController } from './mahasiswa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mahasiswa } from './entities/mahasiswa.entity';

@Module({
  imports: [
    // Add any necessary modules here, such as TypeOrmModule for database access
    TypeOrmModule.forFeature([Mahasiswa]),
  ],
  controllers: [MahasiswaController],
  providers: [MahasiswaService],
  exports: [MahasiswaService],
})
export class MahasiswaModule {}
