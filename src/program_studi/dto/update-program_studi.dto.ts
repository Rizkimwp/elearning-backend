import { PartialType } from '@nestjs/swagger';
import { CreateProgramStudiDto } from './create-program_studi.dto';

export class UpdateProgramStudiDto extends PartialType(CreateProgramStudiDto) {}
