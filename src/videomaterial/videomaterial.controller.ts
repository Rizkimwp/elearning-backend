import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VideomaterialService } from './videomaterial.service';
import { CreateVideomaterialDto } from './dto/create-videomaterial.dto';
import {
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';
import { toResponse } from 'src/helper/response.helper';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('videomaterial')
export class VideomaterialController {
  constructor(private readonly service: VideomaterialService) {}

  @ApiOperation({ summary: 'Upload materi modul dengan file video' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Form data untuk upload file video materi',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Judul Materi' },
        meetingId: { type: 'string', example: 'uuid-meeting' },
        uploadedById: { type: 'string', example: 'uuid-uploader' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['title', 'meetingId', 'uploadedById', 'file'],
    },
  })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateVideomaterialDto,
  ) {
    const data = await this.service.create(dto, file);
    return toResponse(data, 'Video Materi Berhasil Disimpan', true, true);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List video berhasil diambil' })
  async findAll() {
    const data = await this.service.findAll();
    return toResponse(data, 'Data video berhasil diambil', true, true);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Video berhasil ditemukan' })
  async findOne(@Param('id') id: string) {
    const data = await this.service.findOne(id);
    return toResponse(data, 'Video ditemukan', true, true);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Video berhasil dihapus' })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return toResponse(null, 'Video berhasil dihapus', true, true);
  }
}
