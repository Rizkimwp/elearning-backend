import { PartialType } from '@nestjs/swagger';
import { CreateVideomaterialDto } from './create-videomaterial.dto';

export class UpdateVideomaterialDto extends PartialType(CreateVideomaterialDto) {}
