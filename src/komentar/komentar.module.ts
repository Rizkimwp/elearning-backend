import { Module } from '@nestjs/common';
import { KomentarService } from './komentar.service';
import { KomentarController } from './komentar.controller';
import { Komentar } from './entities/komentar.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Komentar])],
  controllers: [KomentarController],
  providers: [KomentarService],
})
export class KomentarModule {}
