import { PartialType } from '@nestjs/swagger';
import { CreateKuisPertanyaanDto } from './create-kuis_pertanyaan.dto';

export class UpdateKuisPertanyaanDto extends PartialType(CreateKuisPertanyaanDto) {}
