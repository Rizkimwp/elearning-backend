import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module as Modul } from './entities/module.entity';
import { Meeting } from 'src/meeting/entities/meeting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Modul, Meeting])],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
