import { ApiProperty } from '@nestjs/swagger';

export class CreateProgramStudiDto {
  @ApiProperty({
    example: 'Teknik Informatika',
    description: 'Nama Program Studi',
  })
  nama: string;
}
