import { PartialType } from '@nestjs/swagger';
import { CreateDiskusiDto } from './create-diskusi.dto';

export class UpdateDiskusiDto extends PartialType(CreateDiskusiDto) {}
