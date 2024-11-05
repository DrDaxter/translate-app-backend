import { Module } from '@nestjs/common';
import { WordManageService } from './services/word-manage.service';
import { WordManageController } from './word-manage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordManage } from './entities/word-manage.entity';
import { WordDefinition } from './entities/word-definition.entity';
import { BookManageModule } from 'src/book-manage/book-manage.module';
import { DefinitionManageService } from './services/definition-manage/definition-manage.service';

@Module({
  imports: [
    BookManageModule,
    TypeOrmModule.forFeature([
      WordManage,
      WordDefinition
    ])
  ],
  controllers: [
    WordManageController
  ],
  providers: [WordManageService, DefinitionManageService],
})
export class WordManageModule {}
