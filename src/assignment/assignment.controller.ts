import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ResponseDto } from 'src/users/dto/responst.dto';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { toResponse } from 'src/helper/response.helper';

@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get()
  @ApiResponse({
    type: ResponseDto,
    status: 200,
    description: 'Berhasil mengambil semua assignment.',
  })
  async findAll() {
    const data = await this.assignmentService.findAll();
    return toResponse(data, 'Daftar assignment berhasil diambil', true, true);
  }

  @Get(':id')
  @ApiResponse({
    type: ResponseDto,
    status: 200,
    description: 'Berhasil mengambil detail assignment.',
  })
  async findOne(@Param('id') id: string) {
    const data = await this.assignmentService.findOne(id);
    return toResponse(data, 'Detail assignment berhasil diambil', true, true);
  }

  @Post()
  @ApiBody({ type: CreateAssignmentDto })
  @ApiResponse({
    type: ResponseDto,
    status: 201,
    description: 'Assignment berhasil dibuat.',
  })
  async create(@Body() dto: CreateAssignmentDto) {
    const data = await this.assignmentService.create(dto);
    return toResponse(data, 'Assignment berhasil dibuat', true, true);
  }

  @Put(':id')
  @ApiBody({ type: CreateAssignmentDto }) // jika pakai Partial DTO bisa diganti
  @ApiResponse({
    type: ResponseDto,
    status: 200,
    description: 'Assignment berhasil diperbarui.',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateAssignmentDto>,
  ) {
    const data = await this.assignmentService.update(id, dto);
    return toResponse(data, 'Assignment berhasil diperbarui', true, true);
  }

  @Delete(':id')
  @ApiResponse({
    type: ResponseDto,
    status: 200,
    description: 'Assignment berhasil dihapus.',
  })
  async remove(@Param('id') id: string) {
    await this.assignmentService.remove(id);
    return toResponse(null, 'Assignment berhasil dihapus', true, true);
  }
}
