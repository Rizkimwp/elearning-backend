import { Injectable } from '@nestjs/common';
import { CreateKomentarDto } from './dto/create-komentar.dto';
import { UpdateKomentarDto } from './dto/update-komentar.dto';

@Injectable()
export class KomentarService {
  create(createKomentarDto: CreateKomentarDto) {
    return 'This action adds a new komentar';
  }

  findAll() {
    return `This action returns all komentar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} komentar`;
  }

  update(id: number, updateKomentarDto: UpdateKomentarDto) {
    return `This action updates a #${id} komentar`;
  }

  remove(id: number) {
    return `This action removes a #${id} komentar`;
  }
}
