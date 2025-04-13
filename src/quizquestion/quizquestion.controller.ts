import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { QuizquestionService } from './quizquestion.service';
import { CreateQuizquestionDto } from './dto/create-quizquestion.dto';
import { ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { toResponse } from 'src/helper/response.helper';

@Controller('quizquestion')
export class QuizquestionController {
  constructor(private readonly service: QuizquestionService) {}

  @Post()
  @ApiBody({ type: CreateQuizquestionDto })
  @ApiResponse({ status: 201, description: 'Berhasil membuat pertanyaan' })
  async create(@Body() dto: CreateQuizquestionDto) {
    const data = await this.service.create(dto);
    return toResponse(data, 'Pertanyaan berhasil dibuat', true, true);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Berhasil mengambil semua pertanyaan',
  })
  async findAll() {
    const data = await this.service.findAll();
    return toResponse(data, 'Pertanyaan berhasil diambil', true, true);
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: 200,
    description: 'Berhasil mengambil satu pertanyaan',
  })
  async findOne(@Param('id') id: string) {
    const data = await this.service.findOne(id);
    return toResponse(data, 'Pertanyaan berhasil diambil', true, true);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Berhasil menghapus pertanyaan' })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return toResponse(null, 'Pertanyaan berhasil dihapus', true, true);
  }
}
