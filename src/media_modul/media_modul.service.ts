import { Injectable } from '@nestjs/common';
import { CreateMediaModulDto } from './dto/create-media_modul.dto';
import { UpdateMediaModulDto } from './dto/update-media_modul.dto';

@Injectable()
export class MediaModulService {
  create(createMediaModulDto: CreateMediaModulDto) {
    return 'This action adds a new mediaModul';
  }

  findAll() {
    return `This action returns all mediaModul`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mediaModul`;
  }

  update(id: number, updateMediaModulDto: UpdateMediaModulDto) {
    return `This action updates a #${id} mediaModul`;
  }

  remove(id: number) {
    return `This action removes a #${id} mediaModul`;
  }
}
