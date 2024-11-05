import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { WordManageService } from './services/word-manage.service';
import { CreateWordManageDto } from './dto/create-word-manage.dto';
import { UpdateWordManageDto } from './dto/update-word-manage.dto';
import { DefinitionManageService } from './services/definition-manage/definition-manage.service';
import { CreateDefinitionManageDto } from './dto/create-definition-manage.dto';

@Controller('word-manage')
export class WordManageController {
  constructor(
    private readonly wordManageService: WordManageService,
    private readonly definitionManageService: DefinitionManageService
  ) {}

  @Post()
  create(@Body() createWordManageDto: CreateWordManageDto) {
    return this.wordManageService.create(createWordManageDto);
  }

  @Post('word-definition')
  createWordDefinition(@Body() wordDefinition: CreateDefinitionManageDto){
    return this.definitionManageService.create(wordDefinition);
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

  @Get('words/:bookId')
  getWordsByBookId(@Param('bookId', ParseIntPipe) bookId: number){
    return this.wordManageService.getWordsByBookId(bookId);
  }
}
