import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from './dto/responst.dto';
import { toResponse } from 'src/helper/response.helper';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrasi User' })
  @ApiResponse({
    status: 200,
    description: 'User Berhasil diambil',
    type: ResponseDto,
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return toResponse(user, 'User berhasil dibuat', true, true);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Membuat User' })
  @ApiResponse({
    status: 200,
    description: 'User Berhasil diambil',
    type: ResponseDto,
  })
  async getAll() {
    const data = await this.usersService.findAll();
    return toResponse(data, 'User Berhasil diambil', true, true);
  }

  @Get('jumlah/siswa')
  @ApiOperation({ summary: 'Mengambil User' })
  @ApiResponse({
    status: 200,
    description: 'User Berhasil diambil',
    type: ResponseDto,
  })
  async getJumlahSiswa() {
    const data = await this.usersService.getSiswa();
    return toResponse(data, 'User Berhasil diambil', true, true);
  }
}
