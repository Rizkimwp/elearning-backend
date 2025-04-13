import { Controller, Body, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateDiscussionreplyDto } from './dto/create-discussionreply.dto';
import { DiscussionreplyService } from './discussionreply.service';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { toResponse } from 'src/helper/response.helper';
import { ResponseDto } from 'src/users/dto/responst.dto';

@Controller('discussionreply')
export class DiscussionreplyController {
  constructor(private readonly service: DiscussionreplyService) {}

  @Get()
  @ApiResponse({
    type: ResponseDto,
    status: 200,
    description: 'Berhasil mengambil semua balasan diskusi.',
  })
  async findAll() {
    const data = await this.service.findAll();
    return toResponse(data, 'Daftar balasan berhasil diambil', true, true);
  }

  @Get('/by-discussion/:discussionId')
  @ApiResponse({
    type: ResponseDto,
    status: 200,
    description: 'Berhasil mengambil balasan berdasarkan diskusi.',
  })
  async findByDiscussion(@Param('discussionId') discussionId: string) {
    const data = await this.service.findByDiscussionId(discussionId);
    return toResponse(
      data,
      'Balasan untuk diskusi berhasil diambil',
      true,
      true,
    );
  }

  @Get(':id')
  @ApiResponse({
    type: ResponseDto,
    status: 200,
    description: 'Berhasil mengambil detail balasan.',
  })
  async findOne(@Param('id') id: string) {
    const data = await this.service.findOne(id);
    return toResponse(data, 'Detail balasan berhasil diambil', true, true);
  }

  @Post()
  @ApiBody({ type: CreateDiscussionreplyDto })
  @ApiResponse({
    type: ResponseDto,
    status: 201,
    description: 'Balasan berhasil dibuat.',
  })
  async create(@Body() dto: CreateDiscussionreplyDto) {
    const data = await this.service.create(dto);
    return toResponse(data, 'Balasan berhasil ditambahkan', true, true);
  }

  @Delete(':id')
  @ApiResponse({
    type: ResponseDto,
    status: 200,
    description: 'Balasan berhasil dihapus.',
  })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return toResponse(null, 'Balasan berhasil dihapus', true, true);
  }
}
