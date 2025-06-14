import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';
import { toResponse } from 'src/helper/response.helper';
import { ResponseDto } from 'src/users/dto/responst.dto';

@Controller('discussion')
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  @Get()
  @ApiQuery({
    name: 'filter',
    required: false,
    enum: ['terbaru', 'sudah_lama', 'semua'],
    description: 'Filter urutan meeting (opsional)',
  })
  @ApiQuery({ name: 'title', required: false, type: String })
  @ApiResponse({
    type: ResponseDto,
    status: 200,
    description: 'Berhasil mengambil semua diskusi.',
  })
  async findAll(
    @Query('filter') filter: 'terbaru' | 'sudah_lama' | 'semua',
    @Query('title') title,
  ) {
    const data = await this.discussionService.findAll(filter, title);
    return toResponse(data, 'Daftar diskusi berhasil diambil', true, true);
  }

  @Get(':id')
  @ApiResponse({
    type: ResponseDto,
    status: 200,
    description: 'Berhasil mengambil detail diskusi.',
  })
  async findOne(@Param('id') id: string) {
    const data = await this.discussionService.findOne(id);
    return toResponse(data, 'Detail diskusi berhasil diambil', true, true);
  }

  @Post()
  @ApiBody({ type: CreateDiscussionDto })
  @ApiResponse({
    type: ResponseDto,
    status: 201,
    description: 'Diskusi berhasil dibuat.',
  })
  async create(@Body() dto: CreateDiscussionDto) {
    const data = await this.discussionService.create(dto);
    return toResponse(data, 'Diskusi berhasil dibuat', true, true);
  }

  @Delete(':id')
  @ApiResponse({
    type: ResponseDto,
    status: 200,
    description: 'Diskusi berhasil dihapus.',
  })
  async remove(@Param('id') id: string) {
    await this.discussionService.remove(id);
    return toResponse(null, 'Diskusi berhasil dihapus', true, true);
  }
}
