import { PartialType } from '@nestjs/swagger';
import { CreateKomentarDto } from './create-komentar.dto';

export class UpdateKomentarDto extends PartialType(CreateKomentarDto) {}
