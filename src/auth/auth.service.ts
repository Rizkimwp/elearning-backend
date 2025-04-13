import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    // private readonly configService: ConfigService,
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(data: LoginDto) {
    try {
      // Mencari user berdasarkan email
      const user = await this.userService.findOne(data.email);

      // Jika user ditemukan dan password cocok
      if (user && (await bcrypt.compare(data.password, user.password))) {
        // Jika password cocok, kembalikan data user tanpa password
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result; // User valid
      }

      // Jika password salah, kembalikan null dan beri keterangan
      throw new Error('Invalid password'); // Password salah
    } catch (error) {
      // Menangani jika user tidak ditemukan atau ada kesalahan lain
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.message === 'User not found') {
        throw new Error('User not found'); // Email salah
      }
      throw new Error('Invalid password'); // Jika ada kesalahan password
    }
  }

  login(user: { email: string; id: string; role: UserRole; nama: string }) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      nama: user.nama,
    };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
