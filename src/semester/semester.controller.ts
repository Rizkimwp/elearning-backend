import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseDto } from 'src/users/dto/responst.dto';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { toResponse } from 'src/helper/response.helper';

@Controller('semester')
export class SemesterController {
  constructor(private readonly semesterService: SemesterService) {}

  @Post()
  @ApiOperation({ summary: 'Create Semester' })
  @ApiResponse({
    status: 200,
    description: 'Data successfully retrieved',
    type: ResponseDto,
  })
  async create(
    @Body() createSemesterDto: CreateSemesterDto,
    @Query('start_at') startAt: string,
    @Query('end_at') endAt: string,
  ) {
    const data = await this.semesterService.create(
      {
        tahun_ajaran: createSemesterDto.tahun_ajaran,
      },
      endAt,
      startAt,
    );
    return toResponse(data, 'Semester successfully created', true, true);
  }

  @Get('get-all')
  @ApiOperation({ summary: 'Get All Semesters' })
  @ApiResponse({
    status: 200,
    description: 'Data successfully retrieved',
    type: [ResponseDto],
  })
  async getAll() {
    const data = await this.semesterService.findAll();
    return toResponse(data, 'Semesters successfully retrieved', true, true);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Semester' })
  @ApiResponse({
    status: 200,
    description: 'Data successfully retrieved',
    type: ResponseDto,
  })
  async delete(@Query('id') id: string) {
    const data = await this.semesterService.delete(id);
    return toResponse(data, 'Semester successfully deleted', true, true);
  }
}
