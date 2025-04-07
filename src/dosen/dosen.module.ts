import { Module } from '@nestjs/common';
import { DosenService } from './dosen.service';
import { DosenController } from './dosen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dosen } from './entities/dosen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dosen])],
  controllers: [DosenController],
  providers: [DosenService],
})
export class DosenModule {}
