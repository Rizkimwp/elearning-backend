import { Module } from '@nestjs/common';
import { KuisPertanyaanService } from './kuis_pertanyaan.service';
import { KuisPertanyaanController } from './kuis_pertanyaan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KuisPertanyaan } from './entities/kuis_pertanyaan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KuisPertanyaan])],
  controllers: [KuisPertanyaanController],
  providers: [KuisPertanyaanService],
})
export class KuisPertanyaanModule {}
