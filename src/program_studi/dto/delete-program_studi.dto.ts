import { ApiProperty } from '@nestjs/swagger';

export class DeleteProgramStudiDto {
  @ApiProperty({
    example: '1231231232131231231234',
  })
  id: string;
}
