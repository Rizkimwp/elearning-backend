import { Injectable } from '@nestjs/common';
import { CreateKuisPertanyaanDto } from './dto/create-kuis_pertanyaan.dto';
import { UpdateKuisPertanyaanDto } from './dto/update-kuis_pertanyaan.dto';

@Injectable()
export class KuisPertanyaanService {
  create(createKuisPertanyaanDto: CreateKuisPertanyaanDto) {
    return 'This action adds a new kuisPertanyaan';
  }

  findAll() {
    return `This action returns all kuisPertanyaan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kuisPertanyaan`;
  }

  update(id: number, updateKuisPertanyaanDto: UpdateKuisPertanyaanDto) {
    return `This action updates a #${id} kuisPertanyaan`;
  }

  remove(id: number) {
    return `This action removes a #${id} kuisPertanyaan`;
  }
}
