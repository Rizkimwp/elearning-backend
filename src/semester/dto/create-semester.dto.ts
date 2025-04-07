import { ApiProperty } from '@nestjs/swagger';

export class CreateSemesterDto {
  @ApiProperty({ type: 'string', description: 'Tahun Ajaran' })
  tahun_ajaran: string;
}
