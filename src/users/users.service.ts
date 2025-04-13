import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    try {
      const { email, role, nama, password, confirmPassword } = data;

      // Validasi konfirmasi password
      if (password !== confirmPassword) {
        throw new BadRequestException(
          'Password dan konfirmasi password tidak sama',
        );
      }

      // Cek apakah email sudah digunakan
      const existing = await this.userRepository.findOne({ where: { email } });
      if (existing) {
        throw new BadRequestException('Email sudah terdaftar');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = this.userRepository.create({
        email,
        nama,
        role,
        password: hashedPassword,
      });

      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.message || 'Gagal membuat user',
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const user = await this.userRepository.find({
        select: ['id', 'nama', 'email', 'role'],
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  }

  async findOne(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        relations: ['mahasiswa'],
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }
}
