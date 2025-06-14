import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuizanswersService } from './quizanswers.service';
import { CreateQuizAnswerDto } from './dto/create-quizanswer.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { toResponse } from 'src/helper/response.helper';

@ApiTags('Quiz Answers')
@Controller('quizanswers')
export class QuizanswersController {
  constructor(private readonly quizAnswerService: QuizanswersService) {}

  @Post()
  @ApiBody({ type: [CreateQuizAnswerDto] })
  @ApiResponse({ status: 201, description: 'Jawaban kuis berhasil disimpan.' })
  async create(@Body() createDto: CreateQuizAnswerDto[]) {
    const data = await this.quizAnswerService.createBulk(createDto);
    return toResponse(data, 'Jawaban kuis berhasil disimpan', true, true);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Daftar semua jawaban kuis.' })
  async findAll() {
    const data = await this.quizAnswerService.findAll();
    return toResponse(
      data,
      'Berhasil mengambil semua jawaban kuis',
      true,
      true,
    );
  }

  @Get('user/:userId')
  @ApiResponse({ status: 200, description: 'Daftar jawaban user.' })
  async findByUser(@Param('userId') userId: string) {
    const data = await this.quizAnswerService.findByUser(userId);
    return toResponse(data, 'Berhasil mengambil jawaban user', true, true);
  }
}
