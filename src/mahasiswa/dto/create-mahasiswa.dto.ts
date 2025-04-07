import { ApiProperty } from '@nestjs/swagger';

export class CreateMahasiswaDto {
  @ApiProperty({
    type: String,
    description: 'ID Program Studi',
    example: '12345678-1234-1234-1234-123456789012',
  })
  idProgramStudi: string;

  @ApiProperty({
    type: String,
    description: 'ID Semester',
    example: '12345678-1234-1234-1234-123456789012',
  })
  idSemester: string;

  @ApiProperty({
    type: String,
    description: 'ID Semester',
    example: '12345678-1234-1234-1234-123456789012',
  })
  idUser: string;
}
