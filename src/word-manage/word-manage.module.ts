import { Module } from '@nestjs/common';
import { WordManageService } from './word-manage.service';
import { WordManageController } from './word-manage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordManage } from './entities/word-manage.entity';
import { WordDefinition } from './entities/word-definition.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WordManage,
      WordDefinition
    ])
  ],
  controllers: [
    WordManageController
  ],
  providers: [WordManageService],
})
export class WordManageModule {}
