import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiskusiService } from './diskusi.service';
import { CreateDiskusiDto } from './dto/create-diskusi.dto';
import { UpdateDiskusiDto } from './dto/update-diskusi.dto';

@Controller('diskusi')
export class DiskusiController {
  constructor(private readonly diskusiService: DiskusiService) {}

  @Post()
  create(@Body() createDiskusiDto: CreateDiskusiDto) {
    return this.diskusiService.create(createDiskusiDto);
  }

  @Get()
  findAll() {
    return this.diskusiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diskusiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiskusiDto: UpdateDiskusiDto) {
    return this.diskusiService.update(+id, updateDiskusiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diskusiService.remove(+id);
  }
}
