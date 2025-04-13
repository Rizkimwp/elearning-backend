import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.validateUser({
        email: loginDto.email,
        password: loginDto.password,
      });

      if (!user) {
        return { status: 'error', message: 'Invalid email or password' };
      }

      const token = this.authService.login({
        id: user.id,
        email: user.email,
        role: user.role,
        nama: user.nama,
      });
      console.log(token.access_token);
      return {
        statusCode: 200,
        status: 'success',
        access_token: token.access_token, // Gantikan dengan token yang dihasilkan
      };
    } catch (error) {
      return {
        status: 'error',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        message: error.message || 'Login failed',
      };
    }
  }
}
