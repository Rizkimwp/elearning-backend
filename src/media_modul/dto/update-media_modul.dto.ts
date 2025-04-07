import { PartialType } from '@nestjs/swagger';
import { CreateMediaModulDto } from './create-media_modul.dto';

export class UpdateMediaModulDto extends PartialType(CreateMediaModulDto) {}
