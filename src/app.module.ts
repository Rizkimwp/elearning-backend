import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProgramStudiModule } from './program_studi/program_studi.module';
import { SemesterModule } from './semester/semester.module';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { DosenModule } from './dosen/dosen.module';
import { ModulModule } from './modul/modul.module';
import { MediaModulModule } from './media_modul/media_modul.module';
import { KuisModule } from './kuis/kuis.module';
import { KuisPertanyaanModule } from './kuis_pertanyaan/kuis_pertanyaan.module';
import { KuisJawabanModule } from './kuis_jawaban/kuis_jawaban.module';
import { DiskusiModule } from './diskusi/diskusi.module';
import { KomentarModule } from './komentar/komentar.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load .env
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '3306', 10), // Default to 3306 if undefined
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true, // Jangan aktifkan di production!
    }),
    UsersModule,
    ProgramStudiModule,
    SemesterModule,
    MahasiswaModule,
    DosenModule,
    ModulModule,
    MediaModulModule,
    KuisModule,
    KuisPertanyaanModule,
    KuisJawabanModule,
    DiskusiModule,
    KomentarModule,
  ],
})
export class AppModule {}
