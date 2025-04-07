import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MediaModulService } from './media_modul.service';
import { CreateMediaModulDto } from './dto/create-media_modul.dto';
import { UpdateMediaModulDto } from './dto/update-media_modul.dto';

@Controller('media-modul')
export class MediaModulController {
  constructor(private readonly mediaModulService: MediaModulService) {}

  @Post()
  create(@Body() createMediaModulDto: CreateMediaModulDto) {
    return this.mediaModulService.create(createMediaModulDto);
  }

  @Get()
  findAll() {
    return this.mediaModulService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaModulService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaModulDto: UpdateMediaModulDto) {
    return this.mediaModulService.update(+id, updateMediaModulDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaModulService.remove(+id);
  }
}
