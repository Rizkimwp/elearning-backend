import { PartialType } from '@nestjs/swagger';
import { CreateKuisJawabanDto } from './create-kuis_jawaban.dto';

export class UpdateKuisJawabanDto extends PartialType(CreateKuisJawabanDto) {}
