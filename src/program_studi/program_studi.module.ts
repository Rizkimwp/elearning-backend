import { Module } from '@nestjs/common';
import { ProgramStudiService } from './program_studi.service';
import { ProgramStudiController } from './program_studi.controller';
import { ProgramStudi } from './entities/program_studi.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // Add any necessary modules here, such as TypeOrmModule for database access
    TypeOrmModule.forFeature([ProgramStudi]),
  ],
  controllers: [ProgramStudiController],
  providers: [ProgramStudiService],
  exports: [ProgramStudiService], // Export the service if needed in other modules
})
export class ProgramStudiModule {}
