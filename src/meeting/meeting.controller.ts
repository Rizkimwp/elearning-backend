import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { toResponse } from 'src/helper/response.helper';

@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Get()
  @ApiQuery({
    name: 'filter',
    required: false,
    enum: ['terbaru', 'sudah_lama', 'semua'],
    description: 'Filter urutan meeting (opsional)',
  })
  @ApiQuery({ name: 'title', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Daftar semua meeting berhasil diambil.',
  })
  async findAll(
    @Query('filter') filter: 'terbaru' | 'sudah_lama' | 'semua',
    @Query('title') title,
  ) {
    const data = await this.meetingService.findAll(filter, title);
    return toResponse(data, 'Daftar Meeting berhasil diambil', true, true);
  }

  @Get('/new')
  @ApiResponse({
    status: 200,
    description: 'Daftar semua meeting berhasil diambil.',
  })
  async findNew() {
    const data = await this.meetingService.findNew();
    return toResponse(data, 'Daftar Meeting berhasil diambil', true, true);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Detail meeting berhasil diambil.' })
  async findOne(@Param('id') id: string) {
    const data = await this.meetingService.findOne(id);
    return toResponse(data, 'Detail Meeting berhasil diambil', true, true);
  }

  @Post()
  @ApiBody({ type: CreateMeetingDto })
  @ApiResponse({ status: 201, description: 'Meeting berhasil dibuat.' })
  async create(@Body() createMeetingDto: CreateMeetingDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const data = await this.meetingService.create(createMeetingDto);
    return toResponse(data, 'Meeting berhasil dibuat', true, true);
  }

  @Put(':id')
  @ApiBody({ type: UpdateMeetingDto })
  @ApiResponse({ status: 200, description: 'Meeting berhasil diperbarui.' })
  async update(
    @Param('id') id: string,
    @Body() updateMeetingDto: UpdateMeetingDto,
  ) {
    const data = await this.meetingService.update(id, updateMeetingDto);
    return toResponse(data, 'Meeting berhasil diperbarui', true, true);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Meeting berhasil dihapus.' })
  async remove(@Param('id') id: string) {
    await this.meetingService.remove(id);
    return toResponse(null, 'Meeting berhasil dihapus', true, true);
  }

  @Get('total/meeting')
  @ApiResponse({ status: 200, description: 'Detail meeting berhasil diambil.' })
  async getTotalMeeting() {
    const data = await this.meetingService.getTotalMeeting();
    return toResponse(data, 'Detail Meeting berhasil diambil', true, true);
  }
}
