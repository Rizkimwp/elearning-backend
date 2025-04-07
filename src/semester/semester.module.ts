import { Module } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { SemesterController } from './semester.controller';
import { Semester } from './entities/semester.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // Add any necessary modules here, such as TypeOrmModule for database access
    TypeOrmModule.forFeature([Semester]),
  ],
  controllers: [SemesterController],
  providers: [SemesterService],
  exports: [SemesterService], // Export the service if needed in other modules
})
export class SemesterModule {}
