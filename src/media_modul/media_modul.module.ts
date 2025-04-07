import { Module } from '@nestjs/common';
import { MediaModulService } from './media_modul.service';
import { MediaModulController } from './media_modul.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaModul } from './entities/media_modul.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MediaModul])],
  controllers: [MediaModulController],
  providers: [MediaModulService],
})
export class MediaModulModule {}
