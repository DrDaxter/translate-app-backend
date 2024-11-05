import { Test, TestingModule } from '@nestjs/testing';
import { WordManageController } from './word-manage.controller';
import { WordManageService } from './services/word-manage.service';

describe('WordManageController', () => {
  let controller: WordManageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordManageController],
      providers: [WordManageService],
    }).compile();

    controller = module.get<WordManageController>(WordManageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
