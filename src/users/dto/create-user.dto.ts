import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Nama lengkap pengguna',
    example: 'John Doe',
  })
  nama: string;

  @ApiProperty({
    type: String,
    description: 'Email pengguna',
    example: 'yourmail@gmail.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password pengguna',
    example: 'yourpassword',
  })
  password: string;

  @ApiProperty({
    type: String,
    description: 'Role pengguna',
    enum: UserRole,
    example: 'mahasiswa',
  })
  role: UserRole;

  @ApiProperty({
    type: String,
    description: 'ID Program Studi',
    example: 'program_studi_id',
  })
  idProgramStudi: string;

  @ApiProperty({
    type: String,
    description: 'ID Semester',
    example: 'semester_id',
  })
  idSemester: string;
}
