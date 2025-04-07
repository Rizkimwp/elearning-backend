import { Module } from '@nestjs/common';
import { DiskusiService } from './diskusi.service';
import { DiskusiController } from './diskusi.controller';
import { Diskusi } from './entities/diskusi.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Diskusi])],
  controllers: [DiskusiController],
  providers: [DiskusiService],
})
export class DiskusiModule {}
