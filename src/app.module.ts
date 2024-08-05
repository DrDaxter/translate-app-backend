import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordManageModule } from './word-manage/word-manage.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordManage } from './word-manage/entities/word-manage.entity';
import { WordDefinition } from './word-manage/entities/word-definition.entity';

@Module({
  imports: [
    WordManageModule,
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
        WordDefinition
      ]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
