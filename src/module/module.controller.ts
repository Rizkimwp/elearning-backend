import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ModuleService } from './module.service';
import {
  ApiResponse,
  ApiBody,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { toResponse } from 'src/helper/response.helper';
import { UpdateModuleDto } from './dto/update-module.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateModuleDto } from './dto/create-module.dto';
import { diskStorage } from 'multer';
import { Express } from 'express';

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

  // @Post()
  // @ApiBody({ type: CreateModuleDto })
  // @ApiResponse({ status: 201, description: 'Materi berhasil dibuat.' })
  // async create(@Body() dto: CreateModuleDto, @Request() req: User) {
  //   const data = await this.moduleService.create(dto, req);
  //   return toResponse(data, 'Materi berhasil dibuat', true, true);
  // }

  @ApiOperation({ summary: 'Upload materi modul dengan file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Form data untuk upload file materi',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Judul Materi' },
        content: { type: 'string', example: 'Konten modul' },
        meetingId: { type: 'string', example: 'uuid-meeting' },
        create_by: { type: 'string', example: 'uuid-meeting' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['title', 'meetingId', 'file'],
    },
  })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const filename = `${Date.now()}-${file.originalname}`;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          cb(null, filename);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateModuleDto,
  ) {
    const data = await this.moduleService.create(dto, file);
    return toResponse(data, 'Materi berhasil disimpan', true, true);
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
