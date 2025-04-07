import { Injectable } from '@nestjs/common';
import { CreateDiskusiDto } from './dto/create-diskusi.dto';
import { UpdateDiskusiDto } from './dto/update-diskusi.dto';

@Injectable()
export class DiskusiService {
  create(createDiskusiDto: CreateDiskusiDto) {
    return 'This action adds a new diskusi';
  }

  findAll() {
    return `This action returns all diskusi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} diskusi`;
  }

  update(id: number, updateDiskusiDto: UpdateDiskusiDto) {
    return `This action updates a #${id} diskusi`;
  }

  remove(id: number) {
    return `This action removes a #${id} diskusi`;
  }
}
