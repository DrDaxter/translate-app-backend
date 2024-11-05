import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookManageDto } from './dto/create-book-manage.dto';
import { UpdateBookManageDto } from './dto/update-book-manage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookManage } from './entities/book-manage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookManageService {
  constructor(
    @InjectRepository(BookManage)
    private readonly bookRepository: Repository<BookManage>
  ){}
  async create(createBookManageDto: CreateBookManageDto) {
    try {
      const book = await this.bookRepository.create(createBookManageDto);

      await this.bookRepository.save(book);

      return book;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Something went wrong, see the logs");
    }
  }

  async findAll() {
    try {
      const data = await this.bookRepository.find({
        relations: ['word']
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Something went wrong, see the logs");
    }
  }

  async findOne(id: number) {
    let data: BookManage;
    try {
      data = await this.bookRepository.findOneBy({book_id: id});
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Something went wrong, see the logs");
    }

    if(!data){
      throw new NotFoundException(`Data with id ${id} does not exist`);
    }

    return data;
  }

  update(id: number, updateBookManageDto: UpdateBookManageDto) {
    return `This action updates a #${id} bookManage`;
  }

  async remove(id: number) {
    const book = await this.findOne(id);

    await this.bookRepository.remove(book);

    return "Success";
  }
}
