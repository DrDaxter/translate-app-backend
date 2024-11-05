import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordManageModule } from './word-manage/word-manage.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordManage } from './word-manage/entities/word-manage.entity';
import { WordDefinition } from './word-manage/entities/word-definition.entity';
import { BookManageModule } from './book-manage/book-manage.module';
import { BookManage } from './book-manage/entities/book-manage.entity';
import { DefinitionManageService } from './word-manage/services/definition-manage/definition-manage.service';

@Module({
  imports: [
    WordManageModule,
    BookManageModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [
        WordManage,
        WordDefinition,
        BookManage
      ],
      logging: true,
      retryAttempts: 5,
      retryDelay: 3000
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
