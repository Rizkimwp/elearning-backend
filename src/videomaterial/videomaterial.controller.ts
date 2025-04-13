import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { VideomaterialService } from './videomaterial.service';
import { CreateVideomaterialDto } from './dto/create-videomaterial.dto';
import { ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { toResponse } from 'src/helper/response.helper';

@Controller('videomaterial')
export class VideomaterialController {
  constructor(private readonly service: VideomaterialService) {}

  @Post()
  @ApiBody({ type: CreateVideomaterialDto })
  @ApiResponse({ status: 201, description: 'Video berhasil ditambahkan' })
  async create(@Body() dto: CreateVideomaterialDto) {
    const data = await this.service.create(dto);
    return toResponse(data, 'Video berhasil ditambahkan', true, true);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List video berhasil diambil' })
  async findAll() {
    const data = await this.service.findAll();
    return toResponse(data, 'Data video berhasil diambil', true, true);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Video berhasil ditemukan' })
  async findOne(@Param('id') id: string) {
    const data = await this.service.findOne(id);
    return toResponse(data, 'Video ditemukan', true, true);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Video berhasil dihapus' })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return toResponse(null, 'Video berhasil dihapus', true, true);
  }
}
