import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BookManageService } from './book-manage.service';
import { CreateBookManageDto } from './dto/create-book-manage.dto';
import { UpdateBookManageDto } from './dto/update-book-manage.dto';

@Controller('book-manage')
export class BookManageController {
  constructor(private readonly bookManageService: BookManageService) {}

  @Post()
  create(@Body() createBookManageDto: CreateBookManageDto) {
    return this.bookManageService.create(createBookManageDto);
  }

  @Get()
  findAll() {
    return this.bookManageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookManageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookManageDto: UpdateBookManageDto) {
    return this.bookManageService.update(+id, updateBookManageDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bookManageService.remove(id);
  }
}
