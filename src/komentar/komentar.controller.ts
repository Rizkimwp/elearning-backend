import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KomentarService } from './komentar.service';
import { CreateKomentarDto } from './dto/create-komentar.dto';
import { UpdateKomentarDto } from './dto/update-komentar.dto';

@Controller('komentar')
export class KomentarController {
  constructor(private readonly komentarService: KomentarService) {}

  @Post()
  create(@Body() createKomentarDto: CreateKomentarDto) {
    return this.komentarService.create(createKomentarDto);
  }

  @Get()
  findAll() {
    return this.komentarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.komentarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKomentarDto: UpdateKomentarDto) {
    return this.komentarService.update(+id, updateKomentarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.komentarService.remove(+id);
  }
}
