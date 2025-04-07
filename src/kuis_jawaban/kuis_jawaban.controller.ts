import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KuisJawabanService } from './kuis_jawaban.service';
import { CreateKuisJawabanDto } from './dto/create-kuis_jawaban.dto';
import { UpdateKuisJawabanDto } from './dto/update-kuis_jawaban.dto';

@Controller('kuis-jawaban')
export class KuisJawabanController {
  constructor(private readonly kuisJawabanService: KuisJawabanService) {}

  @Post()
  create(@Body() createKuisJawabanDto: CreateKuisJawabanDto) {
    return this.kuisJawabanService.create(createKuisJawabanDto);
  }

  @Get()
  findAll() {
    return this.kuisJawabanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kuisJawabanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKuisJawabanDto: UpdateKuisJawabanDto) {
    return this.kuisJawabanService.update(+id, updateKuisJawabanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kuisJawabanService.remove(+id);
  }
}
