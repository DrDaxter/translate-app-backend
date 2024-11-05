import { Test, TestingModule } from '@nestjs/testing';
import { BookManageController } from './book-manage.controller';
import { BookManageService } from './book-manage.service';

describe('BookManageController', () => {
  let controller: BookManageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookManageController],
      providers: [BookManageService],
    }).compile();

    controller = module.get<BookManageController>(BookManageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
