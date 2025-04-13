import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  Put,
} from '@nestjs/common';
import { ModuleService } from './module.service';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { toResponse } from 'src/helper/response.helper';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Daftar semua materi berhasil diambil.',
  })
  async findAll() {
    const data = await this.moduleService.findAll();
    return toResponse(data, 'Daftar materi berhasil diambil', true, true);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Detail materi berhasil diambil.' })
  async findOne(@Param('id') id: string) {
    const data = await this.moduleService.findOne(id);
    return toResponse(data, 'Detail materi berhasil diambil', true, true);
  }

  @Post()
  @ApiBody({ type: CreateModuleDto })
  @ApiResponse({ status: 201, description: 'Materi berhasil dibuat.' })
  async create(@Body() dto: CreateModuleDto, @Request() req: User) {
    const data = await this.moduleService.create(dto, req);
    return toResponse(data, 'Materi berhasil dibuat', true, true);
  }

  @Put(':id')
  @ApiBody({ type: UpdateModuleDto })
  @ApiResponse({ status: 200, description: 'Materi berhasil diperbarui.' })
  async update(@Param('id') id: string, @Body() dto: UpdateModuleDto) {
    const data = await this.moduleService.update(id, dto);
    return toResponse(data, 'Materi berhasil diperbarui', true, true);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Materi berhasil dihapus.' })
  async remove(@Param('id') id: string) {
    await this.moduleService.remove(id);
    return toResponse(null, 'Materi berhasil dihapus', true, true);
  }
}
