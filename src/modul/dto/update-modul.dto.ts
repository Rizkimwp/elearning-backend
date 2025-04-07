import { PartialType } from '@nestjs/swagger';
import { CreateModulDto } from './create-modul.dto';

export class UpdateModulDto extends PartialType(CreateModulDto) {}
