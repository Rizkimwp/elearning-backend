import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MeetingprogressService } from './meetingprogress.service';
import { CreateMeetingprogressDto } from './dto/create-meetingprogress.dto';
import { ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { toResponse } from 'src/helper/response.helper';

@Controller('meetingprogress')
export class MeetingprogressController {
  constructor(private readonly service: MeetingprogressService) {}

  @Post()
  @ApiBody({ type: CreateMeetingprogressDto })
  @ApiResponse({ status: 201, description: 'Progress berhasil dibuat' })
  async create(@Body() dto: CreateMeetingprogressDto) {
    const data = await this.service.create(dto);
    return toResponse(data, 'Progress berhasil dibuat', true, true);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Berhasil mengambil semua progress',
  })
  async findAll() {
    const data = await this.service.findAll();
    return toResponse(data, 'Progress berhasil diambil', true, true);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Berhasil mengambil satu progress' })
  async findOne(@Param('id') id: string) {
    const data = await this.service.findOne(id);
    return toResponse(data, 'Progress berhasil diambil', true, true);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CreateMeetingprogressDto })
  @ApiResponse({ status: 200, description: 'Berhasil memperbarui progress' })
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateMeetingprogressDto>,
  ) {
    const data = await this.service.update(id, dto);
    return toResponse(data, 'Progress berhasil diperbarui', true, true);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Berhasil menghapus progress' })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return toResponse(null, 'Progress berhasil dihapus', true, true);
  }
}
