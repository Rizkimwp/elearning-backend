import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { toResponse } from 'src/helper/response.helper';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Berhasil mengambil daftar quiz' })
  async findAll() {
    const data = await this.quizService.findAll();
    return toResponse(data, 'Daftar quiz berhasil diambil', true, true);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Berhasil mengambil quiz' })
  async findOne(@Param('id') id: string) {
    const data = await this.quizService.findOne(id);
    return toResponse(data, 'Quiz berhasil diambil', true, true);
  }

  @Post()
  @ApiBody({ type: CreateQuizDto })
  @ApiResponse({ status: 201, description: 'Quiz berhasil dibuat' })
  async create(@Body() dto: CreateQuizDto) {
    const data = await this.quizService.create(dto);
    return toResponse(data, 'Quiz berhasil dibuat', true, true);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Quiz berhasil dihapus' })
  async remove(@Param('id') id: string) {
    await this.quizService.remove(id);
    return toResponse(null, 'Quiz berhasil dihapus', true, true);
  }
}
