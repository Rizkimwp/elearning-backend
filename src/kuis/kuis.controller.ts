import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KuisService } from './kuis.service';
import { CreateKuiDto } from './dto/create-kui.dto';
import { UpdateKuiDto } from './dto/update-kui.dto';

@Controller('kuis')
export class KuisController {
  constructor(private readonly kuisService: KuisService) {}

  @Post()
  create(@Body() createKuiDto: CreateKuiDto) {
    return this.kuisService.create(createKuiDto);
  }

  @Get()
  findAll() {
    return this.kuisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kuisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKuiDto: UpdateKuiDto) {
    return this.kuisService.update(+id, updateKuiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kuisService.remove(+id);
  }
}
