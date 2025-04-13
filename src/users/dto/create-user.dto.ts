import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Nama lengkap pengguna',
    example: 'John Doe',
  })
  @IsNotEmpty()
  nama: string;

  @ApiProperty({
    type: String,
    description: 'Email pengguna',
    example: 'yourmail@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password pengguna',
    example: 'yourpassword',
  })
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  password: string;

  @ApiProperty({
    type: String,
    description: 'Role pengguna',
    enum: UserRole,
    example: 'mahasiswa',
  })
  @IsEnum(UserRole, { message: 'Role harus "guru" atau "siswa"' })
  role: UserRole;

  @ApiProperty({
    type: String,
    description: 'Password pengguna',
    example: 'yourpassword',
  })
  @IsNotEmpty({ message: 'Konfirmasi password harus diisi' })
  confirmPassword: string;
}
