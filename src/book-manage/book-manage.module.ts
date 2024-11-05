import { Module } from '@nestjs/common';
import { BookManageService } from './book-manage.service';
import { BookManageController } from './book-manage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookManage } from './entities/book-manage.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      BookManage
    ])
  ],
  controllers: [BookManageController],
  providers: [BookManageService],
})
export class BookManageModule {}
