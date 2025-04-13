import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser({
      email: loginDto.email,
      password: loginDto.password,
    });
    console.log(user);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }
}
