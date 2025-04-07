import { Injectable } from '@nestjs/common';
import { CreateKuisJawabanDto } from './dto/create-kuis_jawaban.dto';
import { UpdateKuisJawabanDto } from './dto/update-kuis_jawaban.dto';

@Injectable()
export class KuisJawabanService {
  create(createKuisJawabanDto: CreateKuisJawabanDto) {
    return 'This action adds a new kuisJawaban';
  }

  findAll() {
    return `This action returns all kuisJawaban`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kuisJawaban`;
  }

  update(id: number, updateKuisJawabanDto: UpdateKuisJawabanDto) {
    return `This action updates a #${id} kuisJawaban`;
  }

  remove(id: number) {
    return `This action removes a #${id} kuisJawaban`;
  }
}
