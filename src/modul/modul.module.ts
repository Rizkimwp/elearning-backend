import { Module } from '@nestjs/common';
import { ModulService } from './modul.service';
import { ModulController } from './modul.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modul } from './entities/modul.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Modul]), // Add your entities here
  ],
  controllers: [ModulController],
  providers: [ModulService],
})
export class ModulModule {}
