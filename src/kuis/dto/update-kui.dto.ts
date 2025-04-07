import { PartialType } from '@nestjs/swagger';
import { CreateKuiDto } from './create-kui.dto';

export class UpdateKuiDto extends PartialType(CreateKuiDto) {}
