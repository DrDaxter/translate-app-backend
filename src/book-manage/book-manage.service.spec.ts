import { Test, TestingModule } from '@nestjs/testing';
import { BookManageService } from './book-manage.service';

describe('BookManageService', () => {
  let service: BookManageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookManageService],
    }).compile();

    service = module.get<BookManageService>(BookManageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
