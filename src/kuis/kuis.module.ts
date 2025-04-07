import { Module } from '@nestjs/common';
import { KuisService } from './kuis.service';
import { KuisController } from './kuis.controller';
import { Kuis } from './entities/kuis.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Kuis])],
  controllers: [KuisController],
  providers: [KuisService],
})
export class KuisModule {}
