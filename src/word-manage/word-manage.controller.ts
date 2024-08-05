import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { WordManageService } from './word-manage.service';
import { CreateWordManageDto } from './dto/create-word-manage.dto';
import { UpdateWordManageDto } from './dto/update-word-manage.dto';

@Controller('word-manage')
export class WordManageController {
  constructor(private readonly wordManageService: WordManageService) {}

  @Post()
  create(@Body() createWordManageDto: CreateWordManageDto) {
    return this.wordManageService.create(createWordManageDto);
  }

  @Get()
  findAll() {
    return this.wordManageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.wordManageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateWordManageDto: UpdateWordManageDto) {
    return this.wordManageService.update(id, updateWordManageDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.wordManageService.remove(id);
  }
}
