import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KuisPertanyaanService } from './kuis_pertanyaan.service';
import { CreateKuisPertanyaanDto } from './dto/create-kuis_pertanyaan.dto';
import { UpdateKuisPertanyaanDto } from './dto/update-kuis_pertanyaan.dto';

@Controller('kuis-pertanyaan')
export class KuisPertanyaanController {
  constructor(private readonly kuisPertanyaanService: KuisPertanyaanService) {}

  @Post()
  create(@Body() createKuisPertanyaanDto: CreateKuisPertanyaanDto) {
    return this.kuisPertanyaanService.create(createKuisPertanyaanDto);
  }

  @Get()
  findAll() {
    return this.kuisPertanyaanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kuisPertanyaanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKuisPertanyaanDto: UpdateKuisPertanyaanDto) {
    return this.kuisPertanyaanService.update(+id, updateKuisPertanyaanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kuisPertanyaanService.remove(+id);
  }
}
