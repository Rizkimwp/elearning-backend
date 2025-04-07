import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ProgramStudiService } from './program_studi.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProgramStudiDto } from './dto/create-program_studi.dto';
import { ResponseDto } from 'src/users/dto/responst.dto';
import { toResponse } from 'src/helper/response.helper';
import { DeleteProgramStudiDto } from './dto/delete-program_studi.dto';

@ApiTags('Program Studi')
@Controller('program-studi')
export class ProgramStudiController {
  constructor(private readonly programStudiService: ProgramStudiService) {}

  @Post()
  @ApiOperation({ summary: 'Membuat User' })
  @ApiResponse({
    status: 200,
    description: 'Data berhasil diambil',
    type: ResponseDto,
  })
  async create(@Body() createProgramStudiDto: CreateProgramStudiDto) {
    const data = await this.programStudiService.create(createProgramStudiDto);
    return toResponse(data, 'Program Studi Berhasil Dibuat', true, true);
  }

  @Get()
  @ApiOperation({ summary: 'Ambil Semua User' })
  @ApiResponse({
    status: 200,
    description: 'Data Berhasil Diambil',
    type: ResponseDto,
  })
  async getAll() {
    const data = await this.programStudiService.getAll();
    return toResponse(data, 'Program Studi Berhasil Diambil', true, true);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Hapus Program Studi' })
  @ApiResponse({
    status: 200,
    description: 'Program Studi Berhasil Dihapus',
    type: ResponseDto,
  })
  async delete(@Body() id: DeleteProgramStudiDto) {
    const data = await this.programStudiService.delete(id.id);
    return toResponse(data, 'Program Studi Berhasil Dihapus', true, true);
  }
}
