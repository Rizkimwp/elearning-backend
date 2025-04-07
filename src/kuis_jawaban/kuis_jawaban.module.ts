import { Module } from '@nestjs/common';
import { KuisJawabanService } from './kuis_jawaban.service';
import { KuisJawabanController } from './kuis_jawaban.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KuisJawaban } from './entities/kuis_jawaban.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KuisJawaban])],
  controllers: [KuisJawabanController],
  providers: [KuisJawabanService],
})
export class KuisJawabanModule {}
