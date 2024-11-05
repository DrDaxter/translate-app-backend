import { Test, TestingModule } from '@nestjs/testing';
import { WordManageService } from './word-manage.service';

describe('WordManageService', () => {
  let service: WordManageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordManageService],
    }).compile();

    service = module.get<WordManageService>(WordManageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
