import { Module } from '@nestjs/common';
import { VideomaterialService } from './videomaterial.service';
import { VideomaterialController } from './videomaterial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoMaterial } from './entities/videomaterial.entity';
import { Meeting } from 'src/meeting/entities/meeting.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VideoMaterial, Meeting, User])],
  controllers: [VideomaterialController],
  providers: [VideomaterialService],
})
export class VideomaterialModule {}
