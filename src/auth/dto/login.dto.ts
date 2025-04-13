import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) for user login.
 * This class is used to validate and transfer login credentials.
 */
export class LoginDto {
  @ApiProperty({ description: 'The email address of the user' })
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  password: string;
}
